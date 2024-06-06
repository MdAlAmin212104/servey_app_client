import Banner from "./HomeComponent/Banner";
import Mission from "./HomeComponent/Mission";
import MostVotingSurvey from "./HomeComponent/MostVotingSurvey";
import QuestionAnsPart from "./HomeComponent/QuestionAnsPart";
import RecentlyCreateSurvey from "./HomeComponent/RecentlyCreateSurvey";

const Home = () => {
    return (
        <div>
            <Banner/>
            <MostVotingSurvey/>
            <RecentlyCreateSurvey/>
            <Mission/>
            <QuestionAnsPart/>
        </div>
    );
};

export default Home;