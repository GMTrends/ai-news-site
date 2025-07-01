// Basic stub for Sanity CMS functions

export async function getNews(count: number) {
  return [];
}

export async function getReviews(count: number) {
  return [];
}

export async function getTutorials(count: number) {
  return [];
}

export async function getBusiness(count: number) {
  return [];
}

export async function getFinance(count: number) {
  return [];
}

export async function getAIAgents(count: number) {
  return [];
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString();
} 