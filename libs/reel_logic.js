
document.addEventListener('DOMContentLoaded', function() {
    //gsap
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "none", duration: 1 });
    let initObject
    function handInit() {
        let browserData = navigator.userAgent.toLowerCase();
        initObject = {
            isMob: window.matchMedia("(max-aspect-ratio: 136/100)").matches,
            isWu: browserData.indexOf('ucbrowser') > -1 || browserData.indexOf("micromessenger") > -1,
        }
        document.querySelector(".xmage-2026 .xmage-main") && document.querySelector(".xmage-2026 .xmage-main").classList.toggle('wu', initObject.isWu);
    }
    function handObserver(elementList, callBack, enterX = 500, enterY = 1000, repeats = false) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    callBack(target, observer);
                    !repeats && observer.unobserve(target);
                }
            })
        }, {
            rootMargin: `${Number(enterY)}px ${Number(enterX)}px`,
        })
        if (elementList) {
            const items = elementList instanceof NodeList ? elementList : [elementList];
            Array.prototype.forEach.call(items, (item) => {
                observer.observe(item);
            });
        }
    }
    function handObserverHide(elementList, callBack, enterX = 0, enterY = 0, repeats = false) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    callBack();
                }
            })
        })
        if (elementList) {
            const items = elementList instanceof NodeList ? elementList : [elementList];
            Array.prototype.forEach.call(items, (item) => {
                observer.observe(item);
            });
        }
    }
    function handObserverVisible(elementList, callBack, visible = 0, repeats = false) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio >= visible) {
                    const target = entry.target;
                    callBack(target, observer);
                    !repeats && observer.unobserve(target);
                }
            })
        }, { threshold: `${Number(visible)}` })
        if (elementList) {
            const items = elementList instanceof NodeList ? elementList : [elementList];
            Array.prototype.forEach.call(items, (item) => {
                observer.observe(item);
            });
        }
    }
    function videoLoad(element) {
        let videoLoad = document.querySelectorAll(element);
        handObserver(videoLoad, function (e) {
            let videoEle = e.querySelectorAll("video");
            videoEle.forEach(function (video) {
                let posterSrc = video.dataset;
                const device = initObject.isMob ? "mob" : "pc";
                const suffix = initObject.isWu ? 'Wx' : '';
                const posterKey = `${device}${suffix}`;
                video.setAttribute("poster", posterSrc[posterKey]);
                if (initObject.isWu) return;
                let sourceEle = video.querySelector("source");
                let sourceSrc = sourceEle.dataset;
                sourceEle.setAttribute("src", sourceSrc[device]);
                video.preload = "auto";
                video.load();
            })
        })
    }
    const mm = gsap.matchMedia();
    mm.add("(max-aspect-ratio: 136/100)", () => {
        handInit()
        videoLoad(".video-load");
    });
    mm.add("(min-aspect-ratio: 136/100)", () => {
        handInit()
        videoLoad(".video-load");
    });
    // section1-start
    function handsec1(params) {
        const beandtitl = document.querySelector(".xmage-2026 .section1-logo");
        const exbrandes = document.querySelector(".xmage-2026 .section1-text");
        const sec1Video = document.querySelector(".xmage-2026 .section1-center video");
    
        const pvscroll = ScrollTrigger.create({
            trigger: ".exbrantrigger",
            start: initObject.isMob ? "top 70%" : "top 60%",
            end: initObject.isMob ? "top 70%" : "top 60%",
            scrub: false,
            markers:false,
            onEnter: function() {
                beandtitl.classList.add("active");
            },
            onEnterBack: function() {
                beandtitl.classList.remove("active");
            }
        })
        const pvscroll1 = ScrollTrigger.create({
            trigger: ".exbrantrigger",
            start: initObject.isMob ? "top 60%" : "top 50%",
            end: initObject.isMob ? "top 60%" : "top 50%",
            scrub: false,
            markers:false,
            onEnter: function() {
                beandtitl.classList.add("active1");
                exbrandes.classList.add("active");
                gsap.to(".xmage-2026 .section1-center", 1, {
                    y: 0,
                    opacity: 1
                });
                setTimeout(() => {
                    if (!initObject.isWu) {
                        sec1Video.play().then(function () { }).catch(function () { });
                    }
                }, 600);
            },
            onEnterBack: function() {
                beandtitl.classList.remove("active1");
                exbrandes.classList.remove("active");
                gsap.to(".xmage-2026 .section1-center", 1, {
                    y: 240 / (initObject.isMob ? 720 : 1920) * window.innerWidth,
                    opacity: 0
                })
            }
        })
    
        let timeline = gsap.timeline();
    
        timeline
        .add(
            gsap.to(".xmage-2026 .section1-center", 1, {
                scale: 1,
                borderRadius: 16 / (initObject.isMob ? 720 : 1920) * window.innerWidth
            })
        )
        const pvscroll2 = ScrollTrigger.create({
            trigger: ".exbrantrigger",
            start: initObject.isMob ? "top 50%": "top 40%",
            end: "+=15%",
            scrub: 2,
            markers:false,
            animation: timeline
        })
    }
    handsec1();
    $(".play-ga").click(function (e) {
        e.preventDefault();
        $(this).initH5player({
            'path': '',
            'target': 'fancybox',
            'autostart': true,
            'afterClose': function () {
            },
        });
    })
    // section1-end
    // section2-start
    function handsec2() {
        function throttle(func, limit) {
            let inThrottle;
            return function () {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => {
                        inThrottle = false;
                    }, limit);
                }
            };
        }
        let $visualList1 = $(".xmage-2026 .section2 .card");
        let visualLists = [$visualList1];
        let visualLength = $visualList1.length;
        let visualNum = 0;
        let timerId;
        let timerId1;
        let timerId2;
        let stopNumber=0;
        const autoVisual = throttle(function (data) {
            visualNum = data === "1" ? (visualNum + 1) % visualLength : (visualNum - 1) % visualLength;
            fadeEvent(visualNum);
        }, 2000);
        const autoVisual1 = function (data) {
            visualNum = data === "1" ? (visualNum + 1) % visualLength : (visualNum - 1) % visualLength;
            fadeEvent(visualNum);
        };
        // $(".xmage-2026 .section2 .prev-botton").click(function (e) {
        //     clearInterval(timerId);
        //     autoVisual("1")
        // })
        // $(".xmage-2026 .section2 .next-botton").click(function (e) {
        //     clearInterval(timerId);
        //     autoVisual("0")
        // })
        $(".xmage-2026 .section2 .card-bottom").click(throttle(function(e) {
            clearInterval(timerId);
            clearTimeout(timerId1);
            if ($(this)[0].getAttribute('data-index') === "1") {
                autoVisual1("1");
                timerId1 = setTimeout(() => {
                    autoVisual1("1");
                }, 2000);
            } else {
                autoVisual1("0");
                timerId1 = setTimeout(() => {
                    autoVisual1("0");
                }, 2000);
            }
        }, 4000))
        function fadeEvent(target) {
            visualLists.forEach(function ($list) {
                $list.removeClass("on prev1 prev2 prev3 prev4 prev5 prev6 prev7 prev8 next1 next2 next3 next4 next5 next6 next7 next8");
                $list.eq((target - 1 + visualLength) % visualLength).addClass("prev1");
                $list.eq((target - 2 + visualLength) % visualLength).addClass("prev2");
                $list.eq((target - 3 + visualLength) % visualLength).addClass("prev3");
                $list.eq((target - 4 + visualLength) % visualLength).addClass("prev4");
                $list.eq((target - 5 + visualLength) % visualLength).addClass("prev5");
                $list.eq((target - 6 + visualLength) % visualLength).addClass("prev6");
                $list.eq((target - 7 + visualLength) % visualLength).addClass("prev7");
                $list.eq((target - 8 + visualLength) % visualLength).addClass("prev8");
                $list.eq((target + 1) % visualLength).addClass("next1");
                $list.eq((target + 2) % visualLength).addClass("next2");
                $list.eq((target + 3) % visualLength).addClass("next3");
                $list.eq((target + 4) % visualLength).addClass("next4");
                $list.eq((target + 5) % visualLength).addClass("next5");
                $list.eq((target + 6) % visualLength).addClass("next6");
                $list.eq((target + 7) % visualLength).addClass("next7");
                $list.eq((target + 8) % visualLength).addClass("next8");
                $list.eq(target).addClass("on");
            });
        }
        // autoVisual("1");
        handObserverVisible(document.querySelector(".xmage-2026 .section2"), function (e) {
            gsap.to([".xmage-2026 .section2 .prev-box",".xmage-2026 .section2 .next-box"], 3, {
                delay:3,
                opacity: 1,
            })
            timerId = setInterval(() => {
                ++stopNumber;
                if (stopNumber < 3) {
                    autoVisual1("0");
                }
            }, 2000);
        }, 0.1);
    
        let boxEle = document.querySelectorAll(".xmage-2026 .section2 .card-box-hover");
        boxEle.forEach(function (params) {
            params.addEventListener('click', function (e) {
                let ele = document.querySelector(params.getAttribute("data-popup"));
                if (ele) {
                    handOpen(ele);
                } else if (!e.target.closest("a")) {
                    e.preventDefault();
                    $(this).initH5player({
                        'path': '',
                        'target': 'fancybox',
                        'autostart': true,
                        'afterClose': function () {
                        },
                    });
                }
                
            });
        })
        let scrollPosition = { scrollX: 0, scrollY: 0 }
        function handOpen(popupEl) {
            let video = popupEl.querySelector(".popup-video");
            if (!video.getAttribute("src")) {
                let posterSrc = video.dataset;
                video.setAttribute("poster", posterSrc.poster);
                video.setAttribute("src", posterSrc.src);
                video.preload = "auto";
                video.load();
            }

            lockScroll();
            popupEl.classList.add("is-open");
            if (video) {
                video.load();
                video.play().then(function () { }).catch(function () { });
            };
            popupEl.addEventListener("click", (e) => {
                if (!e.target.closest(".popup-wrap") || e.target.closest(".popup-close-btn")) {
                    let video = popupEl.querySelector(".popup-video");
                    if (video) {
                        video.pause()
                    }
                    popupEl.addEventListener(
                        "transitionend",
                        () => {
                            unlockScroll();
                        },
                        { capture: false, once: true, passive: false }
                    );
                    popupEl.classList.remove("is-open");
                }
            });
        }
    
        function lockScroll () {
            scrollPosition.scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            scrollPosition.scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            document.documentElement.style.setProperty(
              "--scrollbar-padding-value",
              window.innerWidth - document.body.clientWidth + "px"
            );
            document.documentElement.classList.add("xmage-discovery-popup-open");
        }
        function unlockScroll () {
            window.scrollTo(scrollPosition.scrollX, scrollPosition.scrollY);
            document.documentElement.classList.remove("xmage-discovery-popup-open");
            document.documentElement.style.removeProperty("--scrollbar-padding-value");
        }

        function handtouch(params) {
            const swipeDiv = document.querySelector(params);
            let startX = 0;
            let currentX = 0;
            let startY = 0;
            let currentY = 0;
            let isSwiping = false;
            let touchStartThreshold = 10;

            swipeDiv.addEventListener('touchstart', (e) => {
                if (!initObject.isMob) return;
                startX = 0;
                currentX = 0;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                isSwiping = true;
            },{passive:true});

            swipeDiv.addEventListener('touchmove', (e) => {
                if (!initObject.isMob) return;
                if (isSwiping) {
                    currentX = e.touches[0].clientX;
                    currentY = e.touches[0].clientY;
                }

                let distance = currentX - startX;
                let distanceY = currentY - startY;
                if (Math.abs(distance) > Math.abs(distanceY)){
                    e.preventDefault();
                }

                if (isSwiping) {
                    if (Math.abs(distance) > Math.abs(distanceY)) {
       
                        if (distance > 0) {
                            $(".next-botton").click();
                        } else {
                            $(".prev-botton").click();
                        }
                        isSwiping = false;

                    }
                }
            },{passive:false});
        }
        handtouch(".section2-container")
    }
    handsec2();
    // section2-end
    
    // section3-start
    function canvasElement(canvas, logicWidth, logicHeight) {
        let dpr = window.devicePixelRatio ? window.devicePixelRatio : window.screen.deviceXDPI / window.screen.logicalXDPI || 1;
        if (dpr < 2) dpr = 2;
        canvas.width = logicWidth * dpr;
        canvas.height = logicHeight * dpr;
        let ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        ctx.lineWidth = 2;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        return ctx;
    }
    function loadSequenceImg(frameSrc, frameCount) {
        const images = [];
        for (let i = 0; i <= frameCount; i++) {
            let newImg = new Image();
            newImg.src = `${frameSrc}${initObject.isMob ? "m-" : ""}${(i).toString().padStart(4, '0')}.jpg`;
            images.push(newImg);
        };
        return images;
    }
    function drawCenteredImage(ctx, img, logicWidth, logicHeight) {
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;
        const widthScale = logicWidth / imgWidth;
        let targetWidth = imgWidth * widthScale;
        let targetHeight = imgHeight * widthScale;
        ctx.clearRect(0, 0, targetWidth, targetHeight)
        ctx.drawImage(
            img,
            0, 0, img.naturalWidth, img.naturalHeight,
            0, 0, targetWidth, targetHeight
        );
    }
    function handsec3() {
        if (initObject.isMob) {
            let sec3Video = document.querySelector(".xmage-2026 .section3-video video");
            // let durationDate
            // sec3Video.addEventListener('loadedmetadata', () => {
            //     durationDate = sec3Video.duration;
            // }, { once: true });
            // sec3Video.addEventListener('timeupdate', () => {
            //     if (!isNaN(sec3Video.duration) && sec3Video.duration > 0) {
            //         if (sec3Video.currentTime / durationDate >= 0) {
            //             // gsap.to(".xmage-2026 .section3-mask", 0.3,{delay: 0,"opacity":0.63}),
            //             gsap.to(".xmage-2026 .section3-logo", 0.3,{delay: 0,"opacity":1,"transform": "translateY(0vw) scale(1)"}),
            //             gsap.to(".xmage-2026 .section3-text", 0.3,{delay: 0.3,"opacity":0.6,"transform": "translateY(0vw)"}),
            //             gsap.to(".xmage-2026 .section3-bottom", 0.3,{delay: 0.6,"opacity":1,"transform": "translateY(0vw)"})
            //         }
            //     }
            // });
            handObserverVisible(sec3Video, function (e) {
                setTimeout(() => {
                    if (!initObject.isWu) {
                        sec3Video.play().then(function () { }).catch(function () { });
                    }
                }, 600);
            }, 0.3)
        } else {
            const canvas = document.querySelector(".section3-frame");
            const container = canvas.parentElement;
            const { clientWidth: logicWidth, clientHeight: logicHeight } = container;
            let ctx = canvasElement(canvas,logicWidth,logicHeight);
            const frameCount = initObject.isMob ? canvas.getAttribute('data-m-framecount') : canvas.getAttribute('data-framecount');
            const frameSrc = canvas.getAttribute('data-framesrc');
            let sequenceImgs;
            handObserver(container, function (e) {
                sequenceImgs = loadSequenceImg(frameSrc, frameCount);
            })
            ScrollTrigger.create({
                trigger: ".section3-center",
                start: 'top bottom',
                end: 'bottom top',
                once: true,
                // markers:true,
                onEnter: () => {
                    if (sequenceImgs[0].complete) {
                        drawCenteredImage(ctx, sequenceImgs[0],logicWidth,logicHeight);
                    }
                },
                onEnterBack: () => {
                    sequenceImgs[frameCount].onload = function () {
                        drawCenteredImage(ctx, sequenceImgs[frameCount],logicWidth,logicHeight);
                    }
                }
            });
            function sectionInit() {
                let airpods = {
                    frame: 0
                };
                const sec3Animation = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".section3-center",
                        start: "top top",
                        end: "+=100% bottom",
                        scrub: 0.5,
                        // markers:true,
                    }
                });
                sec3Animation
                .add([
                    gsap.to(airpods, 6,{
                        frame: frameCount - 1,
                        snap: "frame",
                        ease: "none",
                        onUpdate: render,
                        stagger: 0.03,
                    }),
                    gsap.to(".xmage-2026 .section3-logo", 1,{delay: 4,"opacity":1,"transform": "translateY(0vw) scale(1)"}),
                    gsap.to(".xmage-2026 .section3-text", 0.5,{delay: 5,"opacity":0.6,"transform": "translateY(0vw)"}),
                    gsap.to(".xmage-2026 .section3-bottom", 0.5,{delay: 5.5,"opacity":1,"transform": "translateY(0vw)"})
                ])
    
                function render() {
                    let index = airpods.frame;
                    drawCenteredImage(ctx, sequenceImgs[index],logicWidth,logicHeight);
                } 
            }
            sectionInit();
        }
        
    }
    handsec3()
    // section3-end
    
    // section5-start
    function handsec5() {
        let sec5Video = document.querySelector(".xmage-2026 .section5-video video");
        let durationDate;
        if (initObject.isWu) {
            gsap.to([".xmage-2026 .section5-time1 .section5-icon"], 0.3, {
                scale: 1,
                ease: "back.out(1.7)"
            })
            gsap.to([".xmage-2026 .section5-time1 .section5-line"], 0.3, {
                "clip-path": "inset(0px 0px 0px 0px)",
            })
            gsap.to([".xmage-2026 .section5-time1 .section5-text"], 0.3, {
                "opacity": "1",
            })
            gsap.to([".xmage-2026 .section5-time2 .section5-icon"], 0.3, {
                scale: 1,
                ease: "back.out(1.7)"
            })
            gsap.to([".xmage-2026 .section5-time2 .section5-line"], 0.3, {
                "clip-path": "inset(0px 0px 0px 0px)",
            })
            gsap.to([".xmage-2026 .section5-time2 .section5-text"], 0.3, {
                "opacity": "1",
            })
            gsap.to([".xmage-2026 .section5-time3 .section5-icon"], 0.3, {
                scale: 1,
                ease: "back.out(1.7)"
            })
            gsap.to([".xmage-2026 .section5-time3 .section5-line"], 0.3, {
                "clip-path": "inset(0px 0px 0px 0px)",
            })
            gsap.to([".xmage-2026 .section5-time3 .section5-text"], 0.3, {
                "opacity": "1",
            })
        } else {
            sec5Video.addEventListener('loadedmetadata', () => {
                durationDate = sec5Video.duration;
            }, { once: true });
            sec5Video.addEventListener('timeupdate', () => {
                if (!isNaN(sec5Video.duration) && sec5Video.duration > 0) {
                    if (sec5Video.currentTime / durationDate >= 0.3) {
                        gsap.to([".xmage-2026 .section5-time1 .section5-icon"], 0.3, {
                            scale: 1,
                            ease: "back.out(1.7)"
                        })
                        gsap.to([".xmage-2026 .section5-time1 .section5-line"], 0.3, {
                            "clip-path": "inset(0px 0px 0px 0px)",
                        })
                        gsap.to([".xmage-2026 .section5-time1 .section5-text"], 0.3, {
                            "opacity": "1",
                        })
                    }
                    if (sec5Video.currentTime / durationDate >= 0.5) {
                        gsap.to([".xmage-2026 .section5-time2 .section5-icon"], 0.3, {
                            scale: 1,
                            ease: "back.out(1.7)"
                        })
                        gsap.to([".xmage-2026 .section5-time2 .section5-line"], 0.3, {
                            "clip-path": "inset(0px 0px 0px 0px)",
                        })
                        gsap.to([".xmage-2026 .section5-time2 .section5-text"], 0.3, {
                            "opacity": "1",
                        })
                    }
                    if (sec5Video.currentTime / durationDate >= 0.7) {
                        gsap.to([".xmage-2026 .section5-time3 .section5-icon"], 0.3, {
                            scale: 1,
                            ease: "back.out(1.7)"
                        })
                        gsap.to([".xmage-2026 .section5-time3 .section5-line"], 0.3, {
                            "clip-path": "inset(0px 0px 0px 0px)",
                        })
                        gsap.to([".xmage-2026 .section5-time3 .section5-text"], 0.3, {
                            "opacity": "1",
                        })
                    }
                }
            });
        }
        
        handObserverVisible(sec5Video, function (e) {
            setTimeout(() => {
                if (!initObject.isWu) {
                    sec5Video.play().then(function () { }).catch(function () { });
                }
            }, 600);
        }, 0.3)
    }
    handsec5()
    // section5-end
    
    
    // sec6 start
    const xm3dSwiper = {
        init: function() {
    
            if( !initObject.isMob ) {
                this.lSwiper();
                this.rSwiper();
            }
            this.cSwiper();
            this.control();
        },  
        lSwiper: function() {
            const lis = document.querySelectorAll(".xm3dNav li");
            const space = !initObject.isMob ? 60 / 1920 * window.innerWidth : 60 / 720 * window.innerWidth;
            this.lswiper = new Swiper(".xminner-left", {
                speed: 800,
                autoplay: false,
                slidesPerView: "auto",
                centeredSlides: true,
                spaceBetween: space,
                loop: true,
                allowTouchMove: false
            })
        },
        cSwiper: function() {
            const ul = document.querySelector(".xmnanum");
            const ps = document.querySelectorAll(".xmtxtcon p");
            const space = !initObject.isMob ? 105 / 1920 * window.innerWidth : 48 / 720 * window.innerWidth;
    
            this.cswiper = new Swiper(".xminner-center", {
                speed: 800,
                autoplay: false,
                slidesPerView: "auto",
                centeredSlides: true,
                spaceBetween: space,
                loop: true,
                navigation: {
                    prevEl: ".xmlarr",
                    nextEl: ".xmrarr"
                },
                on: {
                    slideChange: function() {
                        ul.setAttribute("data-index", this.realIndex);
                        for( let i = 0; i < ps.length; i++ ) {
                            i == this.realIndex ? 
                            ps[i].classList.add("active") :
                            ps[i].classList.remove("active");
                        }
                    }
                }
            
            })
        },
        rSwiper: function() {
            const space = !initObject.isMob ? 60 / 1920 * window.innerWidth : 60 / 720 * window.innerWidth;
            this.rswiper = new Swiper(".xminner-right", {
                speed: 800,
                slidesPerView: "auto",
                centeredSlides: true,
                spaceBetween: space,
                loop: true,
                allowTouchMove: false
            })
        },
        control: function() {
            const that = this;
            that.cswiper.controller.control = [this.lswiper, this.rswiper]
        }
    }.init();
    // sec6 end

    // sec7n start
    function hSwiObserve() {
        this.sobserve = null;
        this.obserObj = null;
    }
    hSwiObserve.prototype = {
        initElments: function (obserObj) {
            this.obserObj = obserObj;
            this.initObs();
            this.sobserve.observe(obserObj.el);
        },
        initObs: function () {
            const that = this;
            this.sobserve = new IntersectionObserver(function (changes) {
                for (let i = 0; i < changes.length; i++) {
                    if (changes[i].intersectionRatio > 0)
                        that.obserObj.s.autoplay.start();
                    else
                        that.obserObj.s.autoplay.stop();
                }
            })
        }
    }

    const xmgaecom = {
        init: function() {
            if( !initObject.isMob ) {
                this.initScroll();
            }
        },
        initScroll: function() {
            const section6 = document.querySelector(".xmage-2026 .section7");
            const comscroll = ScrollTrigger.create({
                trigger: ".contrigger",
                start: "top bottom-=" + $(".cominner1").height(),
                end: "top bottom-=" + $(".cominner1").height(),
                once: true,
                scrub: false,
                onEnter: function() {
                    section6.classList.add("active");
                }
            })
        }
    }.init()
    const xmagecomswiper = {
        init: function() {
            if( initObject.isMob ) {
                this.initcomswiper();
            }
        },
        initcomswiper: function() {
            const lis = document.querySelectorAll(".commentnav li");
            const XmageHomeSwiper = new Swiper(".ommenterswiper", {
                slidesPerView: "auto",
                observer: true, 
                speed: 1000,
                autoplay: {
                    delay: 3000, 
                    waitForTransition: false
                },
                slideToClickedSlide: true,
                allowTouchMove: true,
                observeParents: true,
                watchSlidesProgress: true,
                on: {
                    slideChange: function() {
                        for( let i = 0; i < lis.length; i++ ) {
                            i == this.activeIndex ?
                            lis[i].classList.add("active"):
                            lis[i].classList.remove("active")
                        }
                    }
                }
            });

            XmageHomeSwiper.autoplay.stop();

            new hSwiObserve().initElments({
                el: document.querySelector(".ommenterswiper"),
                s: XmageHomeSwiper 
            })

            for( let i = 0; i < lis.length; i++ ) {
                lis[i].addEventListener("click", function() {
                    XmageHomeSwiper.slideTo(i);
                })
            }
        }
    }
    xmagecomswiper.init();
    // sec7 end
});
