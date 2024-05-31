import faq from '../../../assets/faq.png'

const QuestionAnsPart = () => {
  return (
    <div className="my-8 lg:flex gap-4">
        <div>
        <img src={faq} alt="" className='h-full' />
        </div>
      <div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-xl font-medium">
        What is this survey about?
        </div>
        <div className="collapse-content">
          <p>This survey aims to gather feedback on specific topic or product. Your responses will help us improve our services and better understand your needs.</p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 my-4">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
        How long will the survey take to complete?
        </div>
        <div className="collapse-content">
          <p>The survey should take approximately estimated time to complete.</p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
        Who can participate in this survey?
        </div>
        <div className="collapse-content">
          <p>This survey is open to specific group, e.g., customers, employees, general public, etc. Participants must be age requirement or older.</p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 my-4">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
        Is there an incentive for completing the survey?
        </div>
        <div className="collapse-content">
          <p>Yes, participants who complete the survey will be entered into a drawing for a chance to win incentive, e.g., gift card, discount, etc.</p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
        How will my responses be used?
        </div>
        <div className="collapse-content">
          <p>Your responses will be used to gather insights and feedback on [specific topic]. The data collected will be analyzed in aggregate form to ensure your privacy.</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default QuestionAnsPart;
