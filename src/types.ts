interface User {
  username: string;
  avatar: string;
  isOnline: boolean;
}

interface Comment {
  id: number;
  content: string;
  user: User;
  score: number;
  createdAt: string;
  replies: Comment[];
}

export { Comment, User };
