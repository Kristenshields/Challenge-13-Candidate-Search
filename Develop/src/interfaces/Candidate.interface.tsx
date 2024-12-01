// TODO: Create an interface for the Candidate objects returned by the API

interface Candidate {
    id: number;
    name: string;
    email: string;
    age: number;
    skills: string[];
    avatar: string;
    video: string;
    resume: string;
    status: 'pending' | 'approved' | 'rejected';
}