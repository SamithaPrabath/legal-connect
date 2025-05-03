import ParentCard from '@components/ParentCard'
import { Box, Typography } from '@mui/material'
import LocalStorageHandler from '@utils/localStorageHandler'
import { useEffect, useState } from 'react';
import faqClients from "@assets/json/faq-client.json";
import faqLawyers from "@assets/json/faq-lawyer.json"
import { UserType } from '@type/User';
import { border } from '@assets/style/boxStyles';

type FaqType = {
    question: string;
    answer: string;
}

const FAQ = () => {
    const [faqs, setFaqs] = useState<FaqType[]>([]) 

    const localStorageHandler = new LocalStorageHandler();
    const userType = localStorageHandler.userType;

    if (userType === UserType.ADMIN) return null;
    
    useEffect(() => {
        const data = userType === UserType.LAWYER ? faqLawyers : faqClients;
        console.log("Faq Data", data);
        setFaqs(data);
    }, [userType]);

  return (
    <Box p="30px">
        <ParentCard title='FAQ' display="flex" flexDirection="column" gap="10px">
          {faqs.map((faq, index) => 
            <Box {...border} px="20px" py="10px">
                <Typography variant='h3'>
                    {index + 1}. {faq.question}
                </Typography>
                <Typography variant='h6' mt="10px">
                    {faq.answer}
                </Typography>
            </Box>
          )}
        </ParentCard>
    </Box>
  )
} 

export default FAQ
