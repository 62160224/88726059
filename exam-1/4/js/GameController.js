
//ตัวแปรเหล่านี้เป็นตัวแปรส่วนกลางเนื่องจากจำเป็นต้องเข้าถึงได้จากหลายฟังก์ชัน
var score = 0,
    highScore = 0,
    time = 30,
    timer;
var IsPlaying = false;
var timeBoard = document.getElementById('time'),
    scoreBoard = document.getElementById('score'),
    btnStart = document.getElementById('btn');

/**
 * ทำให้องค์ประกอบที่ระบุล้มลงโดยการเปลี่ยนคุณสมบัติด้านบน
 * @param {HTMLElement} apple 
 */
function fallDown(apple) {
    if (!(IsPlaying && apple instanceof HTMLElement)) {
        return;
    }
    //จัดเก็บตำแหน่งสูงสุดในปัจจุบัน
    apple.setAttribute('data-top', apple.style.top);
    //เปลี่ยนตำแหน่งบนสุดซึ่งเป็นภาพเคลื่อนไหวโดยใช้คุณสมบัติการเปลี่ยนใน CSS
    apple.style.top = "380px";
    //เพิ่มคะแนน
    score = score + 5;
    //แสดงคะแนนโดยเรียกใช้ฟังก์ชันนี้
    renderScore();
    //ซ่อนแอปเปิ้ลหลังจากถึงพื้นโดยเรียกใช้ฟังก์ชันนี้
    hideFallenApple(apple);
}

/**
 * ซ่อนองค์ประกอบที่มีให้โดยการเปลี่ยนคุณสมบัติการแสดงผล
 * @param {HTMLElement} apple 
 */
function hideFallenApple(apple) {
    //เราต้องรอจนกว่าแอปเปิ้ลจะตกลงมา
    //ดังนั้นเราจะใช้ฟังก์ชัน setTimeout นี้เพื่อรอและซ่อนแอปเปิ้ล
    setTimeout(function () {
        apple.style.display = 'none';
        //เรียกใช้ฟังก์ชันที่จะย้ายแอปเปิ้ลไปด้านบน
        //และแสดงอีกครั้ง
        restoreFallenApple(apple);
    }, 501);
}


function restoreFallenApple(apple) {
    //เช่นเดียวกับใน hideFallenApple เราต้องรอและทำให้องค์ประกอบ html มองเห็นได้
     // เรียกคืนค่าสูงสุด
    apple.style.top = apple.getAttribute('data-top');
    setTimeout(function () {
        apple.style.display = 'inline-block';
    }, 501);
}

/**
 * แสดงคะแนนใน HTMLElement และตรวจสอบคะแนนสูง
 * 
 */
function renderScore() {
    scoreBoard.innerText = score;
    if (score > highScore) {
        highScore = score;
        document.getElementById('high').innerText = highScore;
    }
}

/**
 * Mทำให้เกมเล่นได้โดยตั้งค่าสถานะ IsPlaying เป็นจริง.
 * 
 */
function startGame() {
    // ปิดการใช้งานปุ่มเพื่อให้ไม่สามารถคลิกได้
    btnStart.disabled = "disabled";
    IsPlaying = true;
    renderScore();
   // เริ่มฟังก์ชั่นนับถอยหลังและเรียกใช้ทุกวินาที
     // 1,000 เป็นมิลลิวินาที = 1 วินาที
     // ตัวแปรจับเวลาเก็บการอ้างอิงถึง setInterval ปัจจุบัน
     // ซึ่งจะใช้เพื่อ clearInterval ในภายหลัง
    timer = setInterval(countDown, 1000);
}

/**ดำเนินการนับถอยหลังและแสดงเวลาที่เหลือ
  * หากหมดเวลาก็จะจบเกม
 * 
 */
function countDown() {
    time = time - 1;
    timeBoard.innerText = time;
    if (time == 0) {
        // ล้างช่วงเวลาตัวจับเวลา
        clearInterval(timer);
        //จบเกม
        endGame();
    }
}

/**
  * จบเกมด้วยการตั้งค่า IsPlaying เป็นเท็จ
  * ในที่สุดก็รีเซ็ตคะแนนเวลาและเปิดใช้ btnStart
  * /** */
function endGame() {
    IsPlaying = false;
    alert("Your score is " + score);
    //// รีเซ็ตคะแนนและเวลาสำหรับเกมถัดไป
    score = 0;
    time = 30;
    //เปิดใช้งานปุ่มเพื่อให้คลิกได้
    btnStart.removeAttribute('disabled');
}
