// import SibApiV3Sdk from 'sib-api-v3-sdk';
// import { config } from 'dotenv';

// config();

// const defaultClient = SibApiV3Sdk.ApiClient.instance;
// const apiKey = defaultClient.authentication['api-key'];
// apiKey.apiKey = process.env.BREVO_API_KEY;  


// export const SendEmail = async (receiverEmail, htmlContent) => {
//     const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
//     const sender = {
//         email: "ravikumar7277rv@gmail.com",
//         name:"RVBrothers Pvt. Ltd."
//     };
//     const receivers = [
//         {
//             email:receiverEmail
//         }, 
//     ]; 
//     try {
//         const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//         sendSmtpEmail.sender = sender;
//         sendSmtpEmail.to = receivers;
//         sendSmtpEmail.subject = "Password Reset Email";
//         sendSmtpEmail.htmlContent = htmlContent;

//         const sendEmailResponse = await apiInstance.sendTransacEmail(sendSmtpEmail);
//         return sendEmailResponse;

//     } catch (error) {
//         if(error instanceof SibApiV3SdkException){
//             console.log(`Error while sending email :${error}`);
//             return error
//         }
//         console.log(`Unexpected error occured : ${error}`)
//         throw new Error(`Error : ${error}`)
//     }
// }