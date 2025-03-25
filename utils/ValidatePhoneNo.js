export const ValidatePhoneNo = (phone) => {
    let flag = true;
    let len = phone.toString();

    if(len.length !== 10){
        flag = false;
    }

    return flag;
}   