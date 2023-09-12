import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import styles from './faq.module.css';

function FAQPage() {
    const faqData = [
        {
            question: 'Do you offer delivery services?',
            answer: 'Currently, we do not provide delivery services. Our products are exclusively available for pickup at our designated locations.'
        },
        {
            question: 'How long have you been in operation?',
            answer: 'We have proudly served our local community since 2013. With over a decade of experience, we are committed to delivering premium-quality honey products.'
        },
        {
            question: 'Where can I find you?',
            answer: 'Our primary honey production facilities are situated in Petts Wood and Halstead. These central locations form the heart of our operations where we nurture and process our exquisite honey.'
        },
        {
            question: 'Is your honey blended with other substances?',
            answer: 'No, our honey is entirely pure and organic. We take immense pride in maintaining the authenticity of our products, ensuring that you experience the best quality honey.'
        },
        {
            question: 'Can your honey help with hay fever?',
            answer: 'Yes, there have been reports from our local customers suggesting that our honey may have positive effects in preventing or reducing hay fever symptoms. While results may vary, some people have found relief through regular consumption of our honey.'
        }
    ];

    // State to track the expanded status of each FAQ item
    const [expandedItems, setExpandedItems] = useState([]);

    // Function to toggle the expanded status of an FAQ item
    const toggleExpand = (index) => {
        setExpandedItems((prevState) =>
            prevState.includes(index)
                ? prevState.filter((itemIndex) => itemIndex !== index)
                : [...prevState, index]
        );
    };

    return (
        <>
            <Navbar />
            <h1>Frequently Asked Questions</h1>
            <div className={styles.faqContainer}>
                {faqData.map((faq, index) => (
                    <div key={index} className={styles.faqItem}>
                        <button
                            className={styles.expandButton}
                            onClick={() => toggleExpand(index)}
                        >
                            {faq.question}
                        </button>
                        {expandedItems.includes(index) && (
                            <div className={styles.answer}>{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default FAQPage;
