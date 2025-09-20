// Service Worker for Privacy Panda App
const CACHE_NAME = 'privacy-panda-v2';
const STATIC_CACHE = 'static-cache-v2';
const DYNAMIC_CACHE = 'dynamic-cache-v2';
const IMAGE_CACHE = 'image-cache-v2';
const TOOL_CACHE = 'tool-cache-v2';
const MISSION_CACHE = 'mission-cache-v2';

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/LogoPandagarde.png',
  '/offline.html',
  // Critical app assets
  '/src/main.tsx',
  '/src/App.tsx',
  // Tool assets
  '/src/tools/',
  '/src/components/tools/',
  // Mission content
  '/src/pages/InteractiveStoryPage.tsx',
  '/src/pages/ActivityBookPage.tsx',
  '/src/pages/MissionHub.tsx',
  // Shared components
  '/src/components/story/',
  '/src/components/activities/',
  // Add other critical static assets
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first for static assets
  CACHE_FIRST: 'cache-first',
  // Network first for dynamic content
  NETWORK_FIRST: 'network-first',
  // Stale while revalidate for images
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
};

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker installed');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== STATIC_CACHE && 
                     cacheName !== DYNAMIC_CACHE && 
                     cacheName !== IMAGE_CACHE;
            })
            .map((cacheName) => {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Handle different types of requests
  if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
  } else if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request));
  } else if (isAPIRequest(request, url)) {
    event.respondWith(handleAPIRequest(request));
  } else {
    event.respondWith(handlePageRequest(request));
  }
});

// Check if request is for an image
function isImageRequest(request) {
  return request.destination === 'image' || 
         /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(request.url);
}

// Check if request is for a static asset
function isStaticAsset(request) {
  return request.destination === 'script' ||
         request.destination === 'style' ||
         request.destination === 'font' ||
         /\.(js|css|woff2?|ttf|eot)$/i.test(request.url);
}

// Check if request is for API
function isAPIRequest(request, url) {
  return url.pathname.startsWith('/api/') ||
         url.hostname.includes('supabase') ||
         url.hostname.includes('sentry');
}

// Handle image requests with stale-while-revalidate strategy
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cachedResponse = await cache.match(request);

  // Return cached version immediately if available
  if (cachedResponse) {
    // Update cache in background
    fetch(request)
      .then((response) => {
        if (response.ok) {
          cache.put(request, response.clone());
        }
      })
      .catch(() => {
        // Ignore network errors for background updates
      });
    
    return cachedResponse;
  }

  // If not cached, fetch from network
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Image fetch failed:', error);
    // Return a placeholder image or error response
    return new Response('Image not available offline', {
      status: 404,
      statusText: 'Not Found'
    });
  }
}

// Handle static assets with cache-first strategy
async function handleStaticAsset(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Static asset fetch failed:', error);
    return new Response('Asset not available offline', {
      status: 404,
      statusText: 'Not Found'
    });
  }
}

// Handle API requests with network-first strategy
async function handleAPIRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE);

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('API request failed:', error);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline response for API requests
    return new Response(JSON.stringify({
      error: 'Offline',
      message: 'This feature requires an internet connection'
    }), {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

// Handle page requests with network-first strategy
async function handlePageRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE);

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Page request failed:', error);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page
    return caches.match('/offline.html') || 
           new Response('You are offline. Please check your internet connection.', {
             status: 503,
             statusText: 'Service Unavailable'
           });
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  } else if (event.tag === 'progress-sync') {
    event.waitUntil(syncProgressData());
  } else if (event.tag === 'achievement-sync') {
    event.waitUntil(syncAchievementData());
  }
});

// Handle background sync for general data
async function doBackgroundSync() {
  try {
    console.log('Performing background sync...');
    
    // Sync offline progress data
    await syncProgressData();
    
    // Sync achievement data
    await syncAchievementData();
    
    // Sync story bookmarks
    await syncStoryBookmarks();
    
    console.log('Background sync completed successfully');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Sync progress data
async function syncProgressData() {
  try {
    // Get progress data from IndexedDB or localStorage
    const progressData = await getStoredData('story-progress');
    if (progressData) {
      // Here you would typically send to your backend
      console.log('Syncing progress data:', progressData);
      // For now, just log it
    }
  } catch (error) {
    console.error('Progress sync failed:', error);
  }
}

// Sync achievement data
async function syncAchievementData() {
  try {
    const achievementData = await getStoredData('achievements');
    if (achievementData) {
      console.log('Syncing achievement data:', achievementData);
    }
  } catch (error) {
    console.error('Achievement sync failed:', error);
  }
}

// Sync story bookmarks
async function syncStoryBookmarks() {
  try {
    const bookmarkData = await getStoredData('story-bookmarks');
    if (bookmarkData) {
      console.log('Syncing bookmark data:', bookmarkData);
    }
  } catch (error) {
    console.error('Bookmark sync failed:', error);
  }
}

// Helper function to get stored data
async function getStoredData(key) {
  try {
    // Try to get from IndexedDB first, then localStorage
    return new Promise((resolve) => {
      const request = indexedDB.open('PrivacyPandaDB', 1);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['userData'], 'readonly');
        const store = transaction.objectStore('userData');
        const getRequest = store.get(key);
        
        getRequest.onsuccess = () => {
          resolve(getRequest.result || null);
        };
        
        getRequest.onerror = () => {
          // Fallback to localStorage
          const data = localStorage.getItem(key);
          resolve(data ? JSON.parse(data) : null);
        };
      };
      
      request.onerror = () => {
        // Fallback to localStorage
        const data = localStorage.getItem(key);
        resolve(data ? JSON.parse(data) : null);
      };
    });
  } catch (error) {
    console.error('Error getting stored data:', error);
    return null;
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  let notificationData = {
    title: 'Privacy Panda Update',
    body: 'New content and features available!',
    icon: '/LogoPandagarde.png',
    badge: '/LogoPandagarde.png',
    tag: 'privacy-panda-update',
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
      url: '/'
    }
  };

  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = { ...notificationData, ...data };
    } catch (error) {
      notificationData.body = event.data.text();
    }
  }

  const options = {
    ...notificationData,
    vibrate: [100, 50, 100],
    actions: [
      {
        action: 'explore',
        title: 'Explore New Features',
        icon: '/LogoPandagarde.png'
      },
      {
        action: 'update',
        title: 'Update Now',
        icon: '/LogoPandagarde.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/LogoPandagarde.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow(event.notification.data?.url || '/')
    );
  } else if (event.action === 'update') {
    event.waitUntil(
      clients.openWindow('/?update=true')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
  
  if (event.data && event.data.type === 'CACHE_TOOL_ASSETS') {
    event.waitUntil(cacheToolAssets(event.data.toolId));
  }
  
  if (event.data && event.data.type === 'CACHE_MISSION_CONTENT') {
    event.waitUntil(cacheMissionContent(event.data.missionId));
  }
  
  if (event.data && event.data.type === 'REQUEST_BACKGROUND_SYNC') {
    event.waitUntil(requestBackgroundSync(event.data.tag));
  }
  
  if (event.data && event.data.type === 'SHOW_UPDATE_NOTIFICATION') {
    event.waitUntil(showUpdateNotification(event.data.message));
  }
});

// Cache tool assets for offline use
async function cacheToolAssets(toolId) {
  try {
    const cache = await caches.open(TOOL_CACHE);
    const toolUrls = [
      `/src/tools/${toolId}/`,
      `/src/components/tools/${toolId}.tsx`,
      `/public/images/tools/${toolId}/`
    ];
    
    for (const url of toolUrls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          await cache.put(url, response);
        }
      } catch (error) {
        console.log(`Could not cache ${url}:`, error);
      }
    }
    
    console.log(`Cached assets for tool: ${toolId}`);
  } catch (error) {
    console.error('Error caching tool assets:', error);
  }
}

// Cache mission content for offline use
async function cacheMissionContent(missionId) {
  try {
    const cache = await caches.open(MISSION_CACHE);
    const missionUrls = [
      `/src/pages/${missionId}.tsx`,
      `/src/components/story/`,
      `/src/components/activities/`,
      `/public/images/missions/${missionId}/`
    ];
    
    for (const url of missionUrls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          await cache.put(url, response);
        }
      } catch (error) {
        console.log(`Could not cache ${url}:`, error);
      }
    }
    
    console.log(`Cached content for mission: ${missionId}`);
  } catch (error) {
    console.error('Error caching mission content:', error);
  }
}

// Request background sync
async function requestBackgroundSync(tag) {
  try {
    await self.registration.sync.register(tag);
    console.log(`Background sync registered: ${tag}`);
  } catch (error) {
    console.error('Background sync registration failed:', error);
  }
}

// Show update notification
async function showUpdateNotification(message) {
  const options = {
    body: message || 'A new version of Privacy Panda is available!',
    icon: '/LogoPandagarde.png',
    badge: '/LogoPandagarde.png',
    tag: 'app-update',
    vibrate: [100, 50, 100],
    actions: [
      {
        action: 'update',
        title: 'Update Now',
        icon: '/LogoPandagarde.png'
      },
      {
        action: 'later',
        title: 'Later',
        icon: '/LogoPandagarde.png'
      }
    ]
  };

  await self.registration.showNotification('Privacy Panda Update', options);
}