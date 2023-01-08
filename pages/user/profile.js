import Layout from '../../components/layout/layout';
import SidebarLayout from '../../components/layout/sidebar-layout';

export default function UserProfilePage() {
  return <div className='h-screen'>UserProfilePage</div>;
}

UserProfilePage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <SidebarLayout>{page}</SidebarLayout>
    </Layout>
  );
};
