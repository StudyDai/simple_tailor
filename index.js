var canvas = document.getElementById("canvas")
var ctx = document.getElementById("canvas").getContext("2d");
var fileEl = document.querySelector('#fileList')
fileEl.onchange = () => {
    var floor = document.querySelector('.floor')
    if (floor) {
        floor.remove()
    }
    var cvs2 = document.querySelector('.cvs2')
    if (cvs2) {
        cvs2.remove()
    }
    let files = fileEl.files[0]
    let currentImg = new Image()
    let render = new FileReader()
    let picWidth = 0
    let picHeight = 0
    let base_url = ''
    render.readAsDataURL(files)
    render.onload = () => {
        var img2 = new Image()
        base_url = render.result
        img2.src = base_url
        img2.onload = () => {
            picWidth = img2.width
            picHeight = img2.height
            console.log(picWidth)
            ctx.globalCompositeOperation = "destination-atop";
            var img = new Image(200, 200);
            let url = ''
            img.addEventListener('load', () => {
                let currentX = 0
                let currentY = 0
                let rectWidth = 0
                let rectHeight = 0
                let isDown = false
                let actuallyCurrentlWidth = 0
                let actuallyCurrentHeight = 0
                let actuallyFinalWidth = 0
                let actuallyFinalHeight = 0
                /* 先插入画面中 */
                drawRect(currentX, currentY, rectWidth, rectHeight)

                /* 监听我鼠标点击 */
                canvas.onmousedown = (e) => {
                    var cvs2 = document.querySelector('.cvs2')
                    if (cvs2) {
                        cvs2.remove()
                    }
                    currentX = e.pageX
                    currentY = e.pageY
                    actuallyCurrentlWidth = picWidth / 200 * currentX
                    actuallyCurrentHeight = picHeight / 200 * currentY
                    isDown = true
                    drawRect(currentX, currentY, rectWidth, rectHeight)
                }
                /* 监听鼠标移动 */
                canvas.onmousemove = (e) => {
                    if (isDown) {
                        finalX = e.pageX
                        finalY = e.pageY
                        rectHeight = finalY - currentY
                        rectWidth = finalX - currentX
                        actuallyFinalWidth = picWidth / 200 * rectWidth
                        actuallyFinalHeight = picHeight / 200 * rectHeight
                        drawRect(currentX, currentY, rectWidth, rectHeight)
                    }
                }
                /* 监听我鼠标松开 */
                canvas.onmouseup = (e) => {
                    finalX = e.pageX
                    finalY = e.pageY
                    if (isDown) {
                        isDown = false
                    }
                    let cvs = document.createElement('canvas')
                    cvs.className = "cvs2"
                    cvs.style.backgroundColor = "red"
                    // cvs.style.display = "none"
                    document.querySelector('.avatar').appendChild(cvs)
                    cvs = document.querySelector('.cvs2')
                    cvs.width = rectWidth + 2
                    cvs.height = rectHeight + 2
                    cvs.style.display = "none"
                    let draw = cvs.getContext('2d')
                    draw.drawImage(img, actuallyCurrentlWidth, actuallyCurrentHeight,
                        actuallyFinalWidth, actuallyFinalHeight, 0, 0, rectWidth + 2,
                        rectHeight + 2)
                    url = cvs.toDataURL()
                }
            })
            img.src = base_url;
            img.classList.add('floor')
            document.body.appendChild(img)

            /* 画画 */
            function drawRect(x, y, width, height) {
                ctx.clearRect(0, 0, 200, 200); // 清除画布
                ctx.drawImage(img, 0, 0, 200, 200); // 绘制原始图片
                ctx.fillStyle = "white"
                ctx.fillRect(x, y, width, height)
            }

            /* 点击选择头像就赋值给我的头像 */
            let avatar = document.querySelector('.avatar')
            let btnEl = document.querySelector('button')
            btnEl.onclick = function () {
                let showImg = new Image(200, 200)
                showImg.src = url
                let childImg = avatar.querySelector('img')
                if (childImg) {
                    childImg.remove()
                }
                avatar.appendChild(showImg)
            }
        }
    }
    function initData() {
        var cvs2 = document.querySelector('.cvs2')
        console.log('first', cvs2)
        if (cvs2) {
            cvs2.remove()
        }
    }
}