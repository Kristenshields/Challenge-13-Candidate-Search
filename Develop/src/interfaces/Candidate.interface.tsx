// TODO: Create an interface for the Candidate objects returned by the API

export interface Candidate {
    login: string;
    id: number;
    name: string;
    avatar_url: string;
    html_url: string;
    bio: string;
    email: string;
    location: string;
    company: string;
}
