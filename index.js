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
    const splash = document.getElementById('splash');
    const introContent = document.querySelector('.intro-content');
    const tl = gsap.timeline();

    let w = window.innerWidth;
    let h = window.innerHeight;

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

    const pushDuration = 4; // 稍微拉长一点提升质感
    const pushEase = "expo.inOut";

    // 全局中心点 (将 Y 轴中心点下移，使其远离上方的新高位标题)
    const sceneCenterX = "50%";
    const sceneCenterY = "120%"; // 从 100% 下调至 130%

    // 完全成比例缩放，确保大屏和小屏下的相对布局绝对一致
    const imageWidth = w * 0.25;
    const imageHeight = imageWidth * 0.625; // 16:10 比例

    // 1. 初始化小图位置 (严格基于当前视区宽高计算距离，保持宽屏相同的构图比例)
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
            y: item.y * h,
            z: item.z,
            opacity: 1
        });
    });

    // 2. 初始化最终背景图 (8.jpg)
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
        y: lastItem.y * h,
        z: finalImgZ,
        opacity: 1
    });

    // 3. 镜头推进动画 & 背景图同步回正 (完全同步 xmage.html)
    tl.to(".scene", {
        z: Math.abs(finalImgZ),
        duration: pushDuration,
        ease: pushEase
    }, 0);

    tl.to(finalImg, {
        left: 0,
        top: 0,
        xPercent: 0,
        yPercent: 0,
        x: 0,
        y: 0,
        duration: pushDuration,
        ease: pushEase
    }, 0);

    // Native Javascript for section scroll reveal
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
