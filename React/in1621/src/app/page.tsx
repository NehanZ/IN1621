'use clients'
import SubscriptionPreferences from '../components/subscription/SubscriptionPreferences'

export default function Home() {

  function newsletterSignup(prefs: any) {
    // TODO: Implement newsletter signup logic here
    console.log('Newsletter signup preferences:', prefs);
  }

    return (
      <div>
        <h1>Home</h1>
        <p>Welcome to the home page!</p>
        <SubscriptionPreferences/>
      </div>
    );
  }
  