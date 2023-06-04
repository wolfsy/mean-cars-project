import { Component } from '@angular/core';

interface QuestionAnswerItem {
  question: string;
  answer: string;
  showAnswer: boolean;
}

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.css']
})
export class QuestionAnswerComponent {
  items: QuestionAnswerItem[] = [
    {
      question: 'What services does your automotive workshop provide?',
      answer: '<strong>Answer:</strong> Our automotive workshop offers a wide range of services including routine maintenance, repairs, diagnostics, brake services, and engine tune-ups.',
      showAnswer: true
    },
    {
      question: 'How often should I bring my vehicle to the workshop for regular maintenance?',
      answer: '<strong>Answer:</strong> It is generally recommended to bring your vehicle for regular maintenance every 6 months or as per the manufacturer\'s guidelines. This helps ensure optimal performance, safety, and longevity of your vehicle.',
      showAnswer: false
    },
    {
      question: 'Do you provide warranty for the repairs done at your workshop?',
      answer: '<strong>Answer:</strong> Yes, we provide a warranty for the repairs performed at our workshop. Our warranty period varies depending on the type of repair or service. Please consult our staff for specific details.',
      showAnswer: false
    },
    {
      question: 'Can you assist with vehicle inspections and emissions testing?',
      answer: '<strong>Answer:</strong> Absolutely! Our workshop is equipped to perform comprehensive vehicle inspections and emissions testing to ensure your vehicle meets the required standards and regulations.',
      showAnswer: false
    },
    {
      question: 'How can I schedule an appointment at your workshop?',
      answer: '<strong>Answer:</strong> Scheduling an appointment at our workshop is easy. You can either give us a call during business hours or use our online appointment booking system on our website. Simply provide your preferred date and time, and we will confirm your appointment.',
      showAnswer: false
    }
  ];

  toggleAnswer(item: QuestionAnswerItem): void {
    item.showAnswer = !item.showAnswer;
  }
}