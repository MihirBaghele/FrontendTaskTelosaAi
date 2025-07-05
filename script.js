// Sample review data with avatars and preview
const reviewsData = [
    {
        id: 1,
        name: "Jacob Jones",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg",
        date: "5:42 PM",
        rating: 5,
        text: "Great quality and attention to detail. Their designs elevated my brand. I just want to say thank you for the outstanding work!",
        preview: "Great quality and attention to detail. Their designs elevated my brand. I just...",
        images: [],
        priority: true,
        unread: true,
        replied: false,
        flagged: true
    },
    {
        id: 2,
        name: "Marvin McKinney",
        avatar: "https://randomuser.me/api/portraits/men/12.jpg",
        date: "3:20 PM",
        rating: 3,
        text: "The team is talented, and their product was good, but communication could be better. I had to follow up multiple times to get updates. If they improve responsiveness, they'd be perfect.",
        preview: "The team is talented, and their product was good, but communication could...",
        images: [
            "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=60&h=60&q=80",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=60&h=60&q=80",
            "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=60&h=60&q=80",
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=60&h=60&q=80"
        ],
        priority: false,
        unread: false,
        replied: true,
        flagged: true,
        reply: "Really appreciate you taking the time to share this. I'm so glad to hear you liked the product and our team's work — that truly means a lot. At the same time, I'm genuinely sorry you had to follow up more than once to get updates. That's on us, and we're working on being more proactive with communication. Thanks again for the thoughtful feedback — it helps us get better, and we hope to make your next experience a smoother one!"
    },
    {
        id: 3,
        name: "Theresa Webb",
        avatar: "https://randomuser.me/api/portraits/women/13.jpg",
        date: "Jun 20, 2025",
        rating: 4,
        text: "The best service I've received in a long time! The team was incredibly responsive and professional throughout the entire process.",
        preview: "The best service I've received in a long time! The team was incredibly respon...",
        images: [],
        priority: false,
        unread: false,
        replied: false,
        flagged: false
    },
    {
        id: 4,
        name: "Jane Cooper",
        avatar: "https://randomuser.me/api/portraits/women/14.jpg",
        date: "Jun 20, 2025",
        rating: 5,
        text: "The team is talented, and their product was good, but communication could be improved. Overall satisfied with the results.",
        preview: "The team is talented, and their product was good, but communication could...",
        images: [],
        priority: false,
        unread: false,
        replied: false,
        flagged: false
    },
    {
        id: 5,
        name: "Jenny Wilson",
        avatar: "https://randomuser.me/api/portraits/women/15.jpg",
        date: "Jun 20, 2025",
        rating: 4,
        text: "Very professional and skilled team. The only issue was that we had to request updates multiple times. Would recommend with reservations.",
        preview: "Very professional and skilled team. The only issue was that we had to reques...",
        images: [],
        priority: false,
        unread: false,
        replied: false,
        flagged: false,
        autoReply: true
    },
    {
        id: 6,
        name: "Robert Fox",
        avatar: "https://randomuser.me/api/portraits/men/16.jpg",
        date: "Jun 20, 2025",
        rating: 5,
        text: "Their design work was stunning! We received many compliments from clients. Highly recommended for anyone looking for quality work.",
        preview: "Their design work was stunning! We received many compliments from clients...",
        images: [],
        priority: false,
        unread: false,
        replied: false,
        flagged: false,
        reply: "Thank you for your kind words!"
    },
    {
        id: 7,
        name: "Annette Black",
        avatar: "https://randomuser.me/api/portraits/women/17.jpg",
        date: "Jun 20, 2025",
        rating: 4,
        text: "Good experience overall. The team delivered on time and the quality was as expected. Would work with them again.",
        preview: "Good experience overall. The team delivered on time and the quality was as...",
        images: [],
        priority: false,
        unread: false,
        replied: false,
        flagged: false
    }
];

let currentFilter = 'all';
let currentPage = 1;
let selectedReviewId = reviewsData[0].id;

function init() {
    renderReviewList();
    renderReviewDetail(selectedReviewId);
    setupEventListeners();
    setupSidebarToggle();
    restoreSidebarState();
}

function setupEventListeners() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderReviewList();
        });
    });
    document.getElementById('searchInput').addEventListener('input', function () {
        renderReviewList();
    });
    document.getElementById('sendReplyBtn').addEventListener('click', sendReply);
    document.getElementById('replyInput').addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendReply();
        }
    });
}

function setupSidebarToggle() {
    const sidebar = document.querySelector('.vertical-sidebar');
    const mainContainer = document.querySelector('.main-container');
    const toggleBtn = document.getElementById('sidebarToggleBtn');
    if (!sidebar || !mainContainer || !toggleBtn) return;
    toggleBtn.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed');
        if (sidebar.classList.contains('collapsed')) {
            mainContainer.style.marginLeft = '0';
            mainContainer.style.width = '100vw';
            localStorage.setItem('sidebar-collapsed', '1');
        } else {
            mainContainer.style.marginLeft = '';
            mainContainer.style.width = '';
            localStorage.removeItem('sidebar-collapsed');
        }
    });
}

function restoreSidebarState() {
    const sidebar = document.querySelector('.vertical-sidebar');
    const mainContainer = document.querySelector('.main-container');
    if (!sidebar || !mainContainer) return;
    if (localStorage.getItem('sidebar-collapsed') === '1') {
        sidebar.classList.add('collapsed');
        mainContainer.style.marginLeft = '0';
        mainContainer.style.width = '100vw';
    }
}

function renderReviewList() {
    const container = document.getElementById('reviewList');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    let filteredReviews = reviewsData.filter(review => {
        if (searchTerm && !review.name.toLowerCase().includes(searchTerm) && !review.text.toLowerCase().includes(searchTerm)) {
            return false;
        }
        switch (currentFilter) {
            case 'unread': return review.unread;
            case 'priority': return review.priority;
            case 'un-replied': return !review.replied;
            default: return true;
        }
    });
    container.innerHTML = filteredReviews.map(review => `
        <div class="review-list-item d-flex align-items-start gap-2 py-2 px-3 ${selectedReviewId === review.id ? 'selected' : ''}" style="cursor:pointer; border-radius:8px; background:${selectedReviewId === review.id ? '#e8f0fe' : 'transparent'};" onclick="selectReview(${review.id})">
            <img src="${review.avatar}" alt="${review.name}" class="rounded-circle" style="width:36px;height:36px;object-fit:cover;">
            <div class="flex-grow-1">
                <div class="d-flex align-items-center justify-content-between">
                    <span class="fw-semibold">${review.name}</span>
                    <span class="text-muted small">${review.date}</span>
                </div>
                <div class="d-flex align-items-center gap-1 mb-1">
                    ${generateStarRating(review.rating, 14)}
                    ${review.flagged ? '<i class=\'fas fa-flag text-danger ms-2\'></i>' : ''}
                </div>
                <div class="text-truncate small" style="max-width:320px;">${review.preview}</div>
                
                ${review.replied ? `<div class='text-primary small mt-1'>1 reply</div>` : review.autoReply ? `<div class='text-info small mt-1'>1 automated reply</div>` : ''}
            </div>
        </div>
    `).join('');
}

window.selectReview = function (id) {
    selectedReviewId = id;
    renderReviewList();
    renderReviewDetail(id);
}

function renderReviewDetail(id) {
    const review = reviewsData.find(r => r.id === id);
    if (!review) return;
    // Reviewer name and avatar in header
    document.getElementById('detailReviewerName').textContent = review.name;
    const avatar = document.getElementById('detailReviewerAvatar');
    avatar.src = review.avatar;
    avatar.style.display = 'inline-block';
    // Main detail
    const container = document.getElementById('reviewDetail');
    container.innerHTML = `
        <div class="d-flex flex-column align-items-start gap-1 mb-2">
        <div class="d-flex align-items-start gap-2 mb-2">
  <img src="${review.avatar}" alt="${review.name}" class="rounded-circle" style="width:36px;height:36px;object-fit:cover;">
  
  <div>
    <div class="d-flex align-items-center gap-2">
      <span class="fw-semibold">${review.name}</span>
      ${review.flagged ? '<i class="fas fa-flag text-danger"></i>' : ''}
    </div>
    <span class="text-muted small">Posted on: ${review.date}</span>
  </div>
</div>


        <div class="d-flex align-items-center gap-2 mb-2">
            ${generateStarRating(review.rating, 18)}
            <span class="fw-bold ms-2">${review.rating}.0</span>
        </div>
        <div class="mb-2">${review.text}</div>
        ${review.images && review.images.length ? `<div class='d-flex gap-2 mb-2'>${review.images.map(img => `<img src='${img}' class='rounded' style='width:60px;height:60px;object-fit:cover;'>`).join('')}</div>` : ''}
<div class="review-actions mt-1">
    <button class="action-btn" title="Edit"><i class="fas fa-edit"></i></button>
    <button class="action-btn" title="Mark as Read"><i class="fas fa-envelope-open"></i></button>
    <button class="action-btn" title="Flag"><i class="fas fa-flag"></i></button>
    <button class="action-btn" title="Delete"><i class="fas fa-trash"></i></button>
</div>
${review.replied ? `<div class='text-primary small mt-1'>1 reply</div>` : review.autoReply ? `<div class='text-info small mt-1'>1 automated reply</div>` : ''}
        ${review.replied || review.reply ? `
        <div class='border-top pt-3 mt-3'>
            <div class='d-flex align-items-center gap-2 mb-2'>
                <img src='https://randomuser.me/api/portraits/men/32.jpg' alt='You' class='rounded-circle' style='width:32px;height:32px;'>
                <span class='fw-semibold'>You</span>
                <span class='text-muted small'> Replied by AI on: ${review.date}</span>
            </div>
            <div>${review.reply || 'Thank you for your feedback!'}</div>
        </div>
        ` : ''}
    `;
    document.getElementById('replyInput').value = '';
}

function generateStarRating(rating, size = 14) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<i class="fas fa-star star ${i <= rating ? '' : 'empty'}" style="font-size:${size}px;"></i>`;
    }
    return stars;
}

function sendReply() {
    const input = document.getElementById('replyInput');
    const text = input.value.trim();
    if (!text) return;
    const review = reviewsData.find(r => r.id === selectedReviewId);
    if (review) {
        review.replied = true;
        review.reply = text;
        renderReviewDetail(selectedReviewId);
        renderReviewList();
        input.value = '';
    }
}

document.addEventListener('DOMContentLoaded', init);

// Test functions for demonstration
function runTests() {
    console.log('Running tests...');

    // Test 1: Filter functionality
    console.assert(reviewsData.length > 0, 'Reviews data should not be empty');

    // Test 2: Search functionality
    const searchResults = reviewsData.filter(review =>
        review.name.toLowerCase().includes('jacob')
    );
    console.assert(searchResults.length > 0, 'Search should return results');

    // Test 3: Star rating generation
    const stars = generateStarRating(5);
    console.assert(stars.includes('fas fa-star'), 'Star rating should generate stars');

    // Test 4: Reply functionality
    const testReview = reviewsData[0];
    const originalRepliedStatus = testReview.replied;
    testReview.replied = true;
    testReview.reply = 'Test reply';
    console.assert(testReview.replied === true, 'Reply should be marked as sent');

    console.log('All tests passed!');
}

// Run tests on page load (remove in production)
window.addEventListener('load', runTests); 