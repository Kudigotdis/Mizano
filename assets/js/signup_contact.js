// Mobile Network Selector Logic
document.addEventListener('DOMContentLoaded', () => {
    const networkBtns = document.querySelectorAll('.network-btn');
    const networkInput = document.getElementById('mobileNetworkInput');

    networkBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Deselect all
            networkBtns.forEach(b => b.classList.remove('selected'));

            // Select clicked
            btn.classList.add('selected');

            // Update hidden input
            const network = btn.getAttribute('data-network');
            networkInput.value = network;
        });
    });
});
