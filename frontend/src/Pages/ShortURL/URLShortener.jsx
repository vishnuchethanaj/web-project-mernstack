import React, { useEffect, useState } from 'react'
import { Button, Stack, TextInput } from '@mantine/core';
import Service from '../../utils/http';
export const URLShortener = () => {
   const service = new Service();
   const [data, setData] = useState({});
   const [shortUrl, setShortUrl] = useState("");
   const handleSubmit = async () => {
       try {
            const response = await service.post("s", data);
            setShortUrl(`https://url-shortener-bootcamp.onrender.com/api/s/${response.shortCode}`);
       } catch (error) {
           console.error("POST API call failed!", error.message);
       }
   }
   useEffect(() => {
       console.log(`Short URL is ${shortUrl}`);
   }, [shortUrl])
   return (
       <>
           {shortUrl ? <p>{shortUrl}</p> :
               <Stack>
                   <TextInput
                       size="md"
                       label="Original URL"
                       withAsterisk
                       onChange={ (event) => setData({ ...data, originalUrl: event.target.value }) }
                       placeholder="Enter original URL"
                   />
                   <TextInput
                       label="Customize your link"
                       placeholder="custom link"
                   />
                   <TextInput
                       label="Title"
                       placeholder="Enter title for your link"
                   />
                    <Button onClick={handleSubmit}>Generate Short URL</Button>
               </Stack>
           }
       </>
   )
}