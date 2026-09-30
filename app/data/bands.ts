import type { Band } from "../types/band"

export const bands: Band[] = [
    {
        id: 1,
        name: "Three man down",
        genre: "Pop rock",
        info: "เป็นวงดนตรีป๊อปร็อก จากกลุ่มนิสิตคณะดิจิทัลมีเดียและศิลปภาพยนตร์ และ คณะนิเทศศาสตร์ มหาวิทยาลัยกรุงเทพ ",
        image: "/images/bands/threemandown.jpg",
        members: [
            { name: "กิต กฤตย์ จีรพัฒนานุวงศ์", role: "ร้องนำ",image: "/images/members/kittmd.jpg", }, 
            { name: "ตูน พีรพล เอี่ยมจำรัส ", role: "กีตาร์",image: "/images/members/toontmd.jpg", },
            { name: "เต เตธนันท์ วงศ์ปรีชาโชค ", role: "มือกลอง",image: "/images/members/tetmd.jpg", }
        ]
    },
    {
        id: 2,
        name: "Dr.Fuu",
        genre: "Pop Rock",
        info: ") เป็นวงดนตรี อินดี้ร็อก ไทยจาก จังหวัดระยอง เข้าวงการเพลงครั้งแรกที่ อาร์เอส เมื่อต้น พ.ศ. 2550 ",
        image: "/images/bands/dr-fuu.jpg",
        members: [
            { name: " สวราชย์ ผิวสลับ (โบ๊ท)", role: "ร้องนำ / หัวหน้าวง" ,image: "/images/members/boatfuu.jpg",},
            { name: "เจษฎา รักษาการ (เจมส์)", role: "กีตาร์โซโล่" ,image: "/images/members/jamefuu.jpg",},
            { name: "พัสกร สุทธิวารี (พัส)", role: "กลอง",image: "/images/members/pudfuu.jpg", },
            { name: "กิตติ อดทน (ติ)", role: "เบส" ,image: "/images/members/tifuu.jpg",},
            { name: "อนิรุทธ์ ประกอบพรรค (ต้น)", role: "กีตาร์ RHYTHM" ,image: "/images/members/tonfuu.jpg",}
        ]
    },
    {
        id: 3,
        name: "Solitude Is Bliss",
        genre: "Alternative Rock",
         info: "เป็นวง Alternative Rock จากเชียงใหม่ ก่อตั้งในปี 2013 ดนตรีมีส่วนผสมของ Psychedelic Rock, Shoegaze และ Indie Rock พร้อมซาวด์ที่ค่อนข้างล่องลอยและมีมิติ ",
        image: "/images/bands/solitude-is-bliss.jpg",
        members: [
            { name: "Thanaphol Chumkhammool (เฟนเดอร์)", role: "นักร้อง" ,image: "/images/members/fender.jpg",},
            { name: "Pathanin Sitthi (เบียร์)", role: "กีตาร์" ,image: "/images/members/beersib.jpg",},
            { name: "Jomyoot Wongto (โด่ง)", role: "มือเบส",image: "/images/members/dongsib.jpg", },
            { name: "Panthakorn Thongnen (อาร์ท)", role: "กลอง",image: "/images/members/artsib.jpg", },
            { name: "Songpon Kaewwongwarn (ปอน)", role: "คีย์บอร์ด" ,image: "/images/members/pondsib.jpg",}
        ]
    }
]