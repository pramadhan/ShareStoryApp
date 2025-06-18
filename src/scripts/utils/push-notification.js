// Setup Push Notification dengan VAPID key dari API
// Ganti VAPID_PUBLIC_KEY dengan key dari API Anda
const VAPID_PUBLIC_KEY = 'MASUKKAN_VAPID_PUBLIC_KEY_DISINI';

export async function subscribePush() {
  if (!('serviceWorker' in navigator)) return;
  const reg = await navigator.serviceWorker.ready;
  if (!('PushManager' in window)) return;
  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });
  }
  // Kirim sub.endpoint ke server API Anda untuk simpan subscription user
  return sub;
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
