import { AccountDetailsWrapper } from '../../components/info/Account';
import Header from '../../components/header-footer/Header';
import Footer from '../../components/header-footer/Footer';

export default function Account() {
    return (
        <main>
            <Header />
            <AccountDetailsWrapper />
            <Footer />
        </main>
    );
}
