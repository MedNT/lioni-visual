'use client';

import PostBackup from '@/components/PostBackup';
import PostStatus from '@/components/PostStatus';
import { useState } from 'react';

function Page() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <PostStatus showBackupList={() => setOpen(true)} />
      <PostBackup
        postName="Poste 1"
        open={open}
        onClose={() => setOpen((p) => !p)}
      />
    </div>
  );
}

export default Page;
