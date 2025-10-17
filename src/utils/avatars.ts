export const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
];

export const getAvatarForTransfer = (transferId: string): string => {
  let hash = 0;
  for (let i = 0; i < transferId.length; i++) {
    const char = transferId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; //
  }
  
  const index = Math.abs(hash) % avatars.length;
  return avatars[index];
};
