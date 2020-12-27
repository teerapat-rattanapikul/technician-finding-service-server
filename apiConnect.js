// url : http://localhost:9999/api/graphql

register;

//-------------------------------------------
1 //
`เช็คการซ้ำกันของ username``query{
        usernameCheck(username:"${username}")
    }`;

//-------------------------------------------
2 //
`เช็คการซ้ำกันของ เบอร์โทรศัพท์ ``query{
    phoneCheck(phone:"${phone}")
}`;

//-------------------------------------------
3 //
`ส่ง otp``query{
        sendOTP(phone:"${phone}")
    }`;
//-------------------------------------------
4 //
`บันทึกข้อมูลการสมัคร`` mutation{
        register(REGISTER:{
                username:"${username}",
                password:"${password}",
                firstname:"${firstname}",
                lastname:"${lastname}",
                address:{
                    lat:${lat},
                    lon:${lon}
                        },
                phone:"${phone}",
                role:"${role}",
                aptitude:"${apitutude}",
                onSite:${onSite}
                })
            {
            status
        }
    }`;

//-------------------------------------------
login //
`mutation{
    login(LOGIN:{username:"${username}",password:"${password}"}){
        token
        status
    }
}`;
