register;

//-------------------------------------------
1`เช็คการซ้ำกันของ username` // url : http://localhost:9999/api/user
`query{
        usernameCheck(username:"${username}")
    }`;

//-------------------------------------------
2`เช็คการซ้ำกันของ เบอร์โทรศัพท์ ` // url : http://localhost:9999/api/otp
`query{
    phoneCheck(phone:"${phone}")
}`;

//-------------------------------------------
3`ส่ง otp` // url : http://localhost:9999/api/otp
`query{
        sendOTP(phone:"${phone}")
    }`;
//-------------------------------------------
4`บันทึกข้อมูลการสมัคร` // url : http://localhost:9999/api/user
` mutation{
        register(REGISTER:{
                username:"${username}",
                password:"${password}",
                firstname:"${firstname}",
                lastname:"${lastname}",
                address:{
                    lat:${lat},
                    lon:${lon}},
                phone:"${phone}",
                role:"${role}",
                aptitude:"${apitutude}",
                onSite:${onSite}})
            {
            status
        }
    }`;

//-------------------------------------------
login // url : http://localhost:9999/api/user
`mutation{
    login(LOGIN:{username:"${username}",password:"${password}"}){
        token
        status
    }
}`;
