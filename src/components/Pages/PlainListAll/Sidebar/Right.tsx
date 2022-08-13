import PopularTagsFetch from 'components/Popular/Tags/Fetch';
import PopularTagsList from 'components/Popular/Tags/List';
import { RightSidebar } from 'components/Layout/RightSidebar';

export default function PlainListAllRightSidebar() {
  return (
    <RightSidebar>
      <PopularTagsFetch render={(posts) => <PopularTagsList posts={posts} title="Tags" />} />
    </RightSidebar>
  );
}
