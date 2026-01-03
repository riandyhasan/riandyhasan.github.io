import { analytics } from './firebase';
import { logEvent, type EventParams } from 'firebase/analytics';
import { browser } from '$app/environment';

/**
 * Log a custom event to Firebase Analytics
 * @param eventName - The name of the event
 * @param eventParams - Optional parameters for the event
 */
export function trackEvent(eventName: string, eventParams?: EventParams) {
	if (browser && analytics) {
		logEvent(analytics, eventName, eventParams);
	}
}

/**
 * Track a click event
 * @param elementName - Name of the element that was clicked
 * @param additionalParams - Optional additional parameters
 */
export function trackClick(elementName: string, additionalParams?: EventParams) {
	trackEvent('click', {
		element_name: elementName,
		...additionalParams
	});
}

/**
 * Track a download event
 * @param fileName - Name of the file being downloaded
 * @param fileType - Type of the file (e.g., 'pdf', 'image', 'document')
 */
export function trackDownload(fileName: string, fileType?: string) {
	trackEvent('file_download', {
		file_name: fileName,
		file_type: fileType
	});
}

/**
 * Track an outbound link click
 * @param url - The URL being clicked
 */
export function trackOutboundLink(url: string) {
	trackEvent('outbound_link_click', {
		link_url: url
	});
}

/**
 * Track a search event
 * @param searchTerm - The search term
 */
export function trackSearch(searchTerm: string) {
	trackEvent('search', {
		search_term: searchTerm
	});
}
