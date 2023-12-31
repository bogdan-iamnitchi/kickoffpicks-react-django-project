
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
 
const FormSchema = z
.object({

    code: z.string().max(6, {
        message: 'Code must be 6 characters long.'
    })
    .min(6, {
        message: 'Code must be 6 characters long.'
    }),
})

const JoinRoom = () => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            code: '',
          },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        })
      }

    return (
    <div className="sm:w-420 flex-center flex-col">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            Kick Off Picks - Join Room
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
            Welcome back! Please enter the room code.
        </p>

        <Form {...form}>
        
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="flex-center flex-col gap-5 ml-4 mt-4 mb-4">
    
            <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
                <FormItem className="flex-center flex-col">
                    <FormControl>
                    <Input type="text" className="shad-input text-center" placeholder="Room Code" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <div className="flex flex-row mt-2">
                <Button type="button" className="shad-button_red m-1">
                    <Link className="nav-link" to="/rooms-home">BACK</Link>
                </Button>

                <Button type="submit" className="shad-button_green m-1">
                    JOIN THIS ROOM
                </Button>
            </div>
        </form>
        </Form>
        
    </div>
    )
}

export default JoinRoom;