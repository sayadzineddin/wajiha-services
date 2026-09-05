/**
 * Wajiha Digital Hub - Main Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Dark Mode Handler ---
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        // Initialize Theme preference
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        }
    }

    // --- Modal Handler ---
    const modal = document.getElementById('serviceModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.getElementById('closeModalBtn');

    if (modal && openBtn && closeBtn) {
        const openModal = () => {
            modal.classList.remove('opacity-0', 'pointer-events-none');
            modal.querySelector('div').classList.remove('scale-95');
            modal.querySelector('div').classList.add('scale-100');
            openBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            modal.classList.add('opacity-0', 'pointer-events-none');
            modal.querySelector('div').classList.remove('scale-100');
            modal.querySelector('div').classList.add('scale-95');
            openBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        };

        openBtn.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);

        // Close on clicking outside container
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Close on ESC key press (a11y requirement)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
                closeModal();
            }
        });
    }
});

/**
 * WhatsApp Redirect Form Handler
 */
function submitToWhatsapp(event) {
    event.preventDefault();

    const fname = document.getElementById('fname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const goal = document.getElementById('goal').value.trim();
    const targetWhatsapp = document.getElementById('targetWhatsapp').value;
    const serviceName = document.getElementById('serviceName').value;

    if (!fname || !phone || !goal) return;

    // Formatting Message for WhatsApp
    let message = `مرحباً فريق وجيهة 👋\n\n`;
    message += `أود طلب خدمة: *${serviceName}*\n`;
    message += `👤 الاسم: ${fname}\n`;
    message += `📞 الهاتف: ${phone}\n`;
    message += `🎯 تفاصيل المشروع:\n${goal}\n\n`;
    message += `بانتظار ردكم، شكراً لكم!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${targetWhatsapp}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}