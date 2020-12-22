register;

//-------------------------------------------
1`เช็คการซ้ำกันของ username`// url : http://localhost:9999/api/user
`query{
        usernameCheck(username:"${username}")
    }``   return true ถ้า username สามารถใช้ได้
        return false ถ้า username ซ้้ำ   
    `;
//-------------------------------------------
2`เช็คการซ้ำกันของ เบอร์โทรศัพท์ พร้อมส่ง otp`// url : http://localhost:9999/api/otp
`query{
        sendOTP(phone:"${phone}")
    }``   
        return true ถ้า เบอร์โทร สามารถใช้ได้
        return false ถ้า เบอร์โทร ซ้้ำ   
    `;
//-------------------------------------------
3`ยืนยัน otp `// url : http://localhost:9999/api/otp
`query{
        getOTP(code:"${code}")
    }``   
        return true ถ้า code ถูกต้อง
        return false ถ้า code ไม่ถูกต้อง   
    `;
//-------------------------------------------
4`บันทึกข้อมูลการสมัคร`// url : http://localhost:9999/api/user
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
