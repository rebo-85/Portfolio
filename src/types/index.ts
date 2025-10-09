// This file exports TypeScript types and interfaces used throughout the application.

export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
}

export interface User {
    name: string;
    bio: string;
    email: string;
    github: string;
    linkedin: string;
}

export interface AnimationProps {
    isVisible: boolean;
    duration?: number;
}