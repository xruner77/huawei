document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Navigation Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        // Change threshold to 100px so it only appears when scrolling down past the first part
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Variables and Selectors
    const flyImgs = gsap.utils.toArray('.fly-img');
    const finalImg = document.querySelector('.final-img');
    const introContent = document.querySelector('.intro-content');
    let introTl;

    function setupIntro() {
        if (introTl) introTl.kill();
        
        let w = window.innerWidth;
        let h = window.innerHeight;
        const isMobile = w < 768;

        // --- 完全复刻 xmage.html 的配置 ---
        const config = [
            { x: -0.25, y: -0.2, z: -600 },   // 1.jpg
            { x: -0.20, y: -0.1, z: -2500 }, // 2.jpg
            { x: 0.30, y: -0.1, z: -1500 },   // 3.jpg
            { x: 0.4, y: -0.25, z: -600 },   // 4.jpg
            { x: -0.25, y: 0.10, z: -2000 }, // 5.jpg
            { x: 0.25, y: 0.0, z: -4500 },   // 6.jpg
            { x: -0.1, y: 0.10, z: -4500 },   // 7.jpg
            { x: 0.05, y: 0.0, z: -11000 }   // 8.jpg
        ];

        const pushDuration = 4;
        const pushEase = "expo.inOut";

        // 全局中心点 (响应式调整：移动端中心点稍微上移一点)
        const sceneCenterX = "50%";
        const sceneCenterY = isMobile ? "110%" : "120%"; 

        // 响应式尺寸
        const imageWidth = isMobile ? w * 0.45 : w * 0.25;
        const imageHeight = imageWidth * 0.625;

        // 1. 初始化小图位置
        // 注意：使用 w 作为基准计算 y，以在窄屏（手机）上保持布局比例不被纵向拉伸
        flyImgs.forEach((img, i) => {
            const item = config[i];
            gsap.set(img, {
                width: imageWidth,
                height: imageHeight,
                left: sceneCenterX,
                top: sceneCenterY,
                xPercent: -50,
                yPercent: -50,
                x: item.x * w,
                y: item.y * (isMobile ? w : h), // 移动端使用 w 保持比例
                z: item.z,
                opacity: 1
            });
        });

        // 2. 初始化最终背景图
        const lastItem = config[7];
        const finalImgZ = lastItem.z;

        gsap.set(finalImg, {
            width: "100%",
            height: "100%",
            left: sceneCenterX,
            top: sceneCenterY,
            xPercent: -50,
            yPercent: -50,
            x: lastItem.x * w,
            y: lastItem.y * (isMobile ? w : h),
            z: finalImgZ,
            opacity: 1
        });

        // 3. 镜头推进动画
        introTl = gsap.timeline();
        introTl.to(".scene", {
            z: Math.abs(finalImgZ),
            duration: pushDuration,
            ease: pushEase
        }, 0);

        introTl.to(finalImg, {
            left: 0,
            top: 0,
            xPercent: 0,
            yPercent: 0,
            x: 0,
            y: 0,
            duration: pushDuration,
            ease: pushEase
        }, 0);
    }

    // 初始化
    setupIntro();

    // 窗口尺寸变化重置
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setupIntro, 250);
    });

    const introTitle = document.querySelector('.intro-title');
    gsap.set(introTitle, { opacity: 1 });

    // 初始状态稳定性设置
    gsap.set(introContent, { 
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
        z: 0,
        force3D: true
    });

    // 开启后续滚动动画 (Native Javascript for section scroll reveal)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once visible
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-section');
        observer.observe(section);
    });
});
