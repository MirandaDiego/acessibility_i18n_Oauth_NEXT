import Document, { Head, Html } from "next/document";


export default class CustomDocument extends Document {
    render(){
        return(
            <Html>
                <Head>
                    <link rel="preconnect" href="https://googleapis.com"/>
                    <link rel="preconnect" href="htpps://fonts.gstatic.com" crossOrigin=""/>
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
                    
                </Head>
            </Html>
        )
    }
}