// Configuration from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const webexApiUrl = 'https://webexapis.com/v1';
const webexToken = urlParams.get('webexToken');
const deviceId = urlParams.get('deviceId');
const owmApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const owmToken = urlParams.get('owmToken');
const owmCityId = urlParams.get('owmCityId') || '5506956';
const peopleParam = urlParams.get('people');
const background = urlParams.get('background') || 'https://images.unsplash.com/photo-1568738009519-52d1bad47858?w=1920';
const logo = urlParams.get('logo') || 'https://www.cisco.com/c/en/us/about/brand-center/network-topology-icons/_jcr_content/Grid/category_atl_7c0d/layout-category-atl/anchor_be4a.img.png/1564774400714.png';

// Parse people parameter
const people = peopleParam ? peopleParam.split(',').map(r => r.split(':')) : [];

// Presence status constants
const PRESENCE = {
    'active': { icon: 'checkbox-blank-circle', color: 'success' },
    'call': { icon: 'phone', color: 'warning' },
    'DoNotDisturb': { icon: 'minus-circle', color: 'danger' },
    'inactive': { icon: 'clock', color: 'grey-light' },
    'meeting': { icon: 'video', color: 'warning' },
    'OutOfOffice': { icon: 'airplane', color: 'grey-light' },
    'pending': { icon: 'account-clock', color: 'grey-light' },
    'presenting': { icon: 'presentation', color: 'danger' },
    'unknown': { icon: '', color: '' }
};

// Weather icons mapping
const weatherIcons = {
    '01d': 'assets/01d-49d8c731.svg',
    '01n': 'assets/01n-15c7cb78.svg',
    '02d': 'assets/02d-807a1a44.svg',
    '02n': 'assets/02n-707568fe.svg',
    '03d': 'assets/03n-748e25f6.svg',
    '03n': 'assets/03n-748e25f6.svg',
    '04d': 'assets/03n-748e25f6.svg',
    '04n': 'assets/03n-748e25f6.svg',
    '09d': 'assets/09d-b26b9aff.svg',
    '09n': 'assets/09d-b26b9aff.svg',
    '10d': 'assets/10d-e45780de.svg',
    '10n': 'assets/10n-028f67e2.svg',
    '11d': 'assets/11d-745c5115.svg',
    '11n': 'assets/11d-745c5115.svg',
    '13d': 'assets/13d-dc427479.svg',
    '13n': 'assets/13d-dc427479.svg',
    '50d': 'assets/50d-6bc8e890.svg',
    '50n': 'assets/50d-6bc8e890.svg'
};

// Initialize the application
function init() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Set background and logo
    document.getElementById('background-image').src = background;
    document.getElementById('logo-image').src = logo;
    
    // Start clock
    updateClock();
    setInterval(updateClock, 1000);
    
    // Fetch weather
    fetchWeather();
    setInterval(fetchWeather, 3600000); // Update every hour
    
    // Create person cards
    createPersonCards();
    
    // Show the app
    document.getElementById('app').classList.remove('is-invisible');
}

// Update clock
function updateClock() {
    const now = new Date();
    
    const dateOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    
    document.getElementById('clock-date').textContent = now.toLocaleDateString(undefined, dateOptions);
    document.getElementById('clock-time').textContent = now.toLocaleTimeString(undefined, timeOptions);
}

// Fetch weather data
async function fetchWeather() {
    if (!owmToken) {
        document.getElementById('weather-error').classList.remove('is-hidden');
        document.getElementById('weather-content').classList.add('is-hidden');
        return;
    }
    
    try {
        const params = new URLSearchParams({
            appid: owmToken,
            id: owmCityId,
            units: 'imperial'
        });
        
        const response = await fetch(`${owmApiUrl}?${params}`);
        if (!response.ok) throw new Error('Weather fetch failed');
        
        const data = await response.json();
        
        // Update weather UI
        document.getElementById('weather-place').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('weather-temp').innerHTML = `${Math.round(data.main.temp)}&deg;F`;
        document.getElementById('weather-high').textContent = `H: ${Math.round(data.main.temp_max)}°`;
        document.getElementById('weather-low').textContent = `L: ${Math.round(data.main.temp_min)}°`;
        document.getElementById('weather-main').textContent = data.weather[0].main;
        
        // Set weather icon
        const iconCode = data.weather[0].icon;
        const iconUrl = weatherIcons[iconCode] || weatherIcons['01d'];
        document.getElementById('weather-icon').style.background = `url(${iconUrl}) no-repeat`;
        
        document.getElementById('weather-error').classList.add('is-hidden');
        document.getElementById('weather-content').classList.remove('is-hidden');
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weather-error').classList.remove('is-hidden');
        document.getElementById('weather-content').classList.add('is-hidden');
    }
}

// Fetch person data from Webex
async function fetchPersonData(email) {
    if (!webexToken) {
        throw new Error('No Webex token provided');
    }
    
    const cleanEmail = email.replace(/ /g, '+');
    
    const response = await fetch(`${webexApiUrl}/people?email=${encodeURIComponent(cleanEmail)}`, {
        headers: { 'Authorization': `Bearer ${webexToken}` }
    });
    
    if (!response.ok) throw new Error('Person fetch failed');
    
    const data = await response.json();
    
    if (!data.items || data.items.length !== 1) {
        throw new Error('Person not found');
    }
    
    const person = data.items[0];
    
    return {
        displayName: person.displayName,
        status: person.status || 'unknown',
        image: person.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(person.displayName)}`,
        title: person.title || '',
        dial: person.extension || email
    };
}

// Handle dial action
async function handleDial(number) {
    if (!webexToken || !deviceId) {
        console.error('Missing webexToken or deviceId');
        return;
    }
    
    try {
        await fetch(`${webexApiUrl}/xapi/command/Dial`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${webexToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deviceId,
                arguments: {
                    Number: number,
                    Protocol: 'Sip'
                }
            })
        });
        console.log(`Dialing ${number}...`);
    } catch (error) {
        console.error('Error dialing:', error);
    }
}

// Create person card HTML
function createPersonCard(email, dialNumber) {
    const column = document.createElement('div');
    column.className = 'column is-4 is-flex is-justify-content-center';
    
    const card = document.createElement('div');
    card.className = 'card is-translucent-black person-card';
    
    const cardContent = document.createElement('div');
    cardContent.className = 'card-content person-card-loading';
    cardContent.innerHTML = '<span class="icon is-large"><i class="mdi mdi-loading mdi-spin mdi-48px"></i></span>';
    
    card.appendChild(cardContent);
    column.appendChild(card);
    
    // Fetch person data and update card
    fetchPersonData(email)
        .then(person => {
            updatePersonCard(cardContent, person, dialNumber || email);
            
            // Set up periodic refresh
            setInterval(() => {
                fetchPersonData(email)
                    .then(updatedPerson => updatePersonCard(cardContent, updatedPerson, dialNumber || email))
                    .catch(console.error);
            }, 3600000); // Update every hour
        })
        .catch(error => {
            console.error(`Error loading person ${email}:`, error);
            cardContent.className = 'card-content';
            cardContent.innerHTML = `
                <div class="content has-text-centered">
                    <p class="has-text-danger">Could not load person data</p>
                    <p class="is-size-7">${email}</p>
                </div>
            `;
        });
    
    return column;
}

// Update person card with data
function updatePersonCard(cardContent, person, dialNumber) {
    cardContent.className = 'card-content';
    
    // Get presence info
    const presenceInfo = PRESENCE[person.status] || PRESENCE['unknown'];
    const showPresence = person.status && person.status !== 'unknown';
    
    cardContent.innerHTML = `
        <div class="media is-justify-content-center">
            <figure class="image is-250x250 avatar-container">
                <img class="is-rounded avatar-image" src="${person.image}" alt="avatar" />
                ${showPresence ? `
                    <span class="icon has-background-dark presence" title="${person.status}">
                        <i class="mdi mdi-${presenceInfo.icon} has-text-${presenceInfo.color}" style="font-size: 76px"></i>
                    </span>
                ` : ''}
            </figure>
        </div>
        <div class="content">
            <hr />
            <div class="columns is-vcentered is-mobile is-multiline">
                <div class="column">
                    <h1 class="title is-size-5">${person.displayName}</h1>
                    <h2 class="subtitle is-size-6 has-text-grey">${person.title}</h2>
                </div>
                <div class="column is-narrow">
                    <div class="field is-grouped">
                        <p class="control">
                            <button class="button is-fullwidth is-rounded is-success has-background-dark is-inverted phone" onclick="handleDial('${dialNumber}')">
                                <span class="icon">
                                    <i class="mdi mdi-24px mdi-phone"></i>
                                </span>
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Create all person cards
function createPersonCards() {
    const container = document.getElementById('people-cards');
    
    if (people.length === 0) {
        container.innerHTML = `
            <div class="column">
                <div class="notification is-warning">
                    <p>No people configured. Add the <code>people</code> parameter to the URL.</p>
                </div>
            </div>
        `;
        return;
    }
    
    people.forEach(person => {
        const email = person[0];
        const dialNumber = person[1] || person[0];
        const card = createPersonCard(email, dialNumber);
        container.appendChild(card);
    });
}

// Make handleDial available globally for onclick handlers
window.handleDial = handleDial;

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

