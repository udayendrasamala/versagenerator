"use client";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { MessageCircleCodeIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField,FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateChatCompletionRequestMessage } from "openai/resources/index.mjs";

const ConversationPage =() =>{
    const router  =useRouter();
    const [messages, setMessages ] = useState<CreateChatCompletionRequestMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    });

    const isLoading = form.formState.isSubmitting;
    
    const onSubmit = async(values:z.infer<typeof formSchema>)=>{
        try{

        }catch(error:any){
            console.log(error);
        }
        finally{
            router.refresh();
        }
    };

    return(
        <div>
            <Heading 
            title="conversation"
            description="Ask Anything"
            icon={MessageCircleCodeIcon}
            iconcolor="text-violet-500"
            bgcolor="bg-violet-500/10"
            />
            <div className="px-4 lg:px-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-lg border w-full p-4 px-3 md:px-6 
                    focus-within:shadow-sm grid grid-cols-12 gap-2" 
                    >
                        <FormField 
                            name="prompt"
                            render={({field})=>(
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input className="border-0 outline-none focus-visible:ring-0
                                        focus-visible:ring-transparent"
                                        disabled={isLoading}
                                        placeholder="Best food in Hyderabad"
                                        {...field}
                                        />
                                      
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-2 w-full"
                        disabled={isLoading}>
                            Generate
                        </Button>
                    </form>

                </Form>
            </div>
            <div className="space-y-4 mt-4">
                Messagges Content
            </div>
        </div>
    )
}
export default ConversationPage;