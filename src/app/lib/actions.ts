'use server';

import { signIn } from "@/auth";
import { sql } from "@vercel/postgres";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";


const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
      invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount greater than $0.' }), //gt: maior que 
    status: z.enum(['pending', 'paid'], {
      invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
  });

const CreateInvoice = FormSchema.omit({id: true, date: true});
const UpdateInvoice = FormSchema.omit({id: true, date: true});


export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
}

export async function createInvoice(prevState: State,formData: FormData) {

    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: Number(formData.get('amount')),
        status: formData.get('status'),

     });

     if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Invoice.',
        };
      }

      const { customerId, amount, status } = validatedFields.data;
      const amountInCents = amount * 100;
      const date = new Date().toISOString().split('T')[0];

     try {
        await sql`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
      } catch (error) {
        return {
          message: 'Database Error: Failed to Create Invoice.',
        };
      }
    //Depois que o banco de dados for atualizado, o /dashboard/invoicescaminho será revalidado e novos dados serão buscados do servidor.
     revalidatePath('/dashboard/invoice');
     redirect('/dashboard/invoices');

    // para formulário com vários campos: const rawFormData = Object.fromEntries(formData.entries())
    const rawFormData = {
        customerid: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    };

    console.log(rawFormData);
    console.log(typeof rawFormData.amount);
}

export async function updateInvoice( id:string, prevState: State, formData: FormData) {

    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
        
    });

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Update Invoice.',
        };
      }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
      

    try{
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
    `;}catch (error){
        return{
            message: 'Databse Error: Failed Update Invoice'
        }
    }
//revalidatePathpara limpar o cache do cliente e fazer uma nova solicitação ao servidor.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    // throw new Error('Falied to Delete')
    try{
    await sql`
    DELETE FROM invoices
    WHERE id = ${id}
    `;
    revalidatePath('/dashboard/invoices');
}catch(error){
        return{
            message: 'Database Error: Failed Delete Invoice'
        }
    }

    
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

