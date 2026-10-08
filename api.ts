import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('careerai_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('careerai_token');
      localStorage.removeItem('careerai_user');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

// ─── Auth ──────────────────────────────────────────────────────────────────────
export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  demoLogin: () =>
    api.post('/auth/demo-login'),
  me: () =>
    api.get('/auth/me')
};

// ─── User ──────────────────────────────────────────────────────────────────────
export const userApi = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data: any) => api.patch('/user/profile', data),
  completeOnboarding: (data: any) => api.post('/user/onboarding', data),
  deleteData: () => api.delete('/user/data')
};

// ─── Resume ────────────────────────────────────────────────────────────────────
export const resumeApi = {
  analyze: (file: File) => {
    const form = new FormData();
    form.append('resume', file);
    return api.post('/resume/analyze', form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getLatest: () => api.get('/resume/latest')
};

// ─── GitHub ───────────────────────────────────────────────────────────────────
export const githubApi = {
  analyze: (username: string) => api.post('/github/analyze', { username }),
  getLatest: () => api.get('/github/latest')
};

// ─── Career ───────────────────────────────────────────────────────────────────
export const careerApi = {
  recommend: () => api.get('/career/recommend'),
  getPaths: () => api.get('/career/paths')
};

// ─── Skills ───────────────────────────────────────────────────────────────────
export const skillsApi = {
  getProfile: () => api.get('/skills/profile'),
  analyzeGap: (careerPath: string, requiredSkills?: string[]) =>
    api.post('/skills/gap', { careerPath, requiredSkills })
};

// ─── Roadmap ──────────────────────────────────────────────────────────────────
export const roadmapApi = {
  generate: (careerPath: string) => api.post('/roadmap/generate', { careerPath }),
  getCurrent: () => api.get('/roadmap/current'),
  updateItem: (itemId: string, status: string) => api.patch(`/roadmap/items/${itemId}`, { status })
};

// ─── Courses ──────────────────────────────────────────────────────────────────
export const coursesApi = {
  getRecommendations: () => api.get('/courses/recommendations'),
  getAll: () => api.get('/courses')
};

// ─── Projects ─────────────────────────────────────────────────────────────────
export const projectsApi = {
  getRecommendations: () => api.get('/projects/recommendations')
};

// ─── Interview ────────────────────────────────────────────────────────────────
export const interviewApi = {
  start: (data: { type: string; difficulty: string; questionCount: number; targetRole?: string }) =>
    api.post('/interview/start', data),
  evaluate: (data: { interviewId: string; questionId: string; answer: string; interviewType: string; difficulty: string; expectedKeyPoints: string[]; question: string }) =>
    api.post('/interview/evaluate', data),
  complete: (interviewId: string) =>
    api.post(`/interview/${interviewId}/complete`),
  getHistory: () => api.get('/interview/history'),
  getById: (id: string) => api.get(`/interview/${id}`)
};

// ─── Job Readiness ────────────────────────────────────────────────────────────
export const jobReadinessApi = {
  get: () => api.get('/job-readiness'),
  recalculate: (weights?: any) => api.post('/job-readiness/recalculate', { weights })
};

// ─── Career Coach ─────────────────────────────────────────────────────────────
export const careerCoachApi = {
  chat: (message: string) => api.post('/career-coach/chat', { message }),
  getHistory: () => api.get('/career-coach/history'),
  getSuggestions: () => api.get('/career-coach/suggestions'),
  clearHistory: () => api.delete('/career-coach/history')
};

// ─── Analytics ────────────────────────────────────────────────────────────────
export const analyticsApi = {
  getSummary: () => api.get('/analytics/summary')
};

// ─── Status ───────────────────────────────────────────────────────────────────
export const statusApi = {
  get: () => api.get('/status')
};
