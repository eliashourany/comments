interface User {
  username: string;
  avatar: string;
  isOnline: boolean;
  title: string;
  handle: string;
}

interface Comment {
  id: number;
  content: string;
  user: User;
  score: number;
  createdAt: string;
  replies: Comment[];
}

enum Mode {
  Edit,
  Reply,
  New,
}

export { Comment, User, Mode };
