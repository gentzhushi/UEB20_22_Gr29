class Review {
    constructor(dealerName, rating, userReview, date) {
        this.dealerName = dealerName;
        this.rating = rating;
        this.userReview = userReview;
        this.date = date;
    }
}

let reviews = [];

function displayReviews() {
    const reviewsSection = document.getElementById('reviews');
    reviewsSection.innerHTML = '';

    if (reviews.length === 0) {
        reviewsSection.innerHTML = '<p>No reviews yet. Be the first one!</p>';
    } else {
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.innerHTML = `
                <h3>${review.dealerName}</h3>
                <p>Rating: ${review.rating} Stars</p>
                <p>${filterProfanity(review.userReview)}</p>
                <p>Date: ${review.date}</p>
            `;
            reviewsSection.appendChild(reviewElement);
        });
    }
}

function displayCalculations() {
    const averageElement = document.getElementById('average-rating');
    const starCountsElement = document.getElementById('star-counts');

    if (reviews.length === 0) {
        averageElement.textContent = 'Average Rating: N/A';
        starCountsElement.textContent = '5 Stars: 0 | 4 Stars: 0 | 3 Stars: 0 | 2 Stars: 0 | 1 Star: 0';
    } else {
        let totalRating = 0;
        let starCounts = [0, 0, 0, 0, 0]; // 5 stars, 4 stars, 3 stars, 2 stars, 1 star

        reviews.forEach(review => {
            totalRating += parseInt(review.rating);
            starCounts[parseInt(review.rating) - 1]++;
        });

        const averageRating = totalRating / reviews.length;

        averageElement.textContent = `Average Rating: ${averageRating.toFixed(1)} Stars`;
        starCountsElement.textContent = `5 Stars: ${starCounts[4]} | 4 Stars: ${starCounts[3]} | 3 Stars: ${starCounts[2]} | 2 Stars: ${starCounts[1]} | 1 Star: ${starCounts[0]}`;
    }
}

function filterProfanity(text) {
    const profanityWords = ['fuck', 'shit', 'bitch', 'cunt','profanitet'];

    for (const profanity of profanityWords) {
        const regex = new RegExp(`\\b${profanity}\\b`, 'gi');
        text = text.replace(regex, '*'.repeat(profanity.length));
    }

    return text;
}

$(document).ready(function () {
    $("#show-reviews").click(function () {
        $("#reviews").fadeIn(1000);
        $("#show-reviews").hide();
        $("#hide-reviews").show();
    });

    $("#hide-reviews").click(function () {
        $("#reviews").fadeOut(1000);
        $("#show-reviews").show();
        $("#hide-reviews").hide();
    });
});

function validateDealerName(dealerName) {
    return dealerName.length >= 2;
}

function validateRating(rating) {
    return !isNaN(rating) && parseInt(rating) >= 1 && parseInt(rating) <= 5;
}

function validateUserReview(userReview) {
    return userReview.length >= 0;
}

function submitReview() {
    const dealerName = document.getElementById('dealer-name').value;
    const ratingElements = document.getElementsByName('rating');
    let selectedRating;

    for (const element of ratingElements) {
        if (element.checked) {
            selectedRating = element.value;
            break;
        }
    }

    const userReview = document.getElementById('review').value;

    // Validate inputs
    if (!validateDealerName(dealerName) || !validateRating(selectedRating) || !validateUserReview(userReview)) {
        alert('Please fill in all fields correctly.');
        return;
    }

    // Capture the current date using moment.js
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    // Simulate a delay with setTimeout (e.g., 1000 milliseconds or 1 second)
    setTimeout(() => {
        const newReview = new Review(dealerName, selectedRating, userReview, formattedDate);

        reviews.push(newReview);

        displayReviews();
        displayCalculations();

        // Clear input fields
        document.getElementById('dealer-name').value = '';
        document.querySelector('input[name="rating"]:checked').checked = false;
        document.getElementById('review').value = '';
    }, 1000); // 1000 milliseconds = 1 second
    const review1 = new Review('Ag Hamiti', 5, 'Great service and friendly staff!', '1/2/2024, 7:20:57 PM');
    const review2 = new Review('Euron Osmani', 4, 'Nice experience overall. Would recommend.', '1/3/2024, 3:16:39 PM');
    const review3 = new Review('Gent Zhushi', 3, 'Average service. Could be better.', '1/4/2024, 11:05:22 PM');

    reviews.push(review1, review2, review3);
}
displayReviews();
displayCalculations();
