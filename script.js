class Review {
    constructor(dealerName, rating, userReview) {
        this.dealerName = dealerName;
        this.rating = rating;
        this.userReview = userReview;
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
                <p>${review.userReview}</p>
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
    if (!dealerName || !selectedRating) {
        alert('Please fill in all fields, including selecting a rating.');
        return;
    }

   
    const newReview = new Review(dealerName, selectedRating, userReview);

   
    reviews.push(newReview);

  
    displayReviews();

    
    displayCalculations();

    
    document.getElementById('dealer-name').value = '';
    document.querySelector('input[name="rating"]:checked').checked = false;
    document.getElementById('review').value = '';
}


displayReviews();
displayCalculations();
