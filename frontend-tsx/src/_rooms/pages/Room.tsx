
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Link } from "react-router-dom"
 
const FormSchema = z
.object({
    type: z.enum(["liga1", "champions-league", "world-cup"], {
        required_error: "You need to select a notification type.",
    }),
    max_players: z.coerce.number().min(2, {
        message: 'Cannot be less than 2 players.'
    }),
    votes_to_skip: z.coerce.number().min(1, {
        message: 'Cannot be less than 1 vote.' 
    }),
})

const Room = () => {

    const isHost = true;

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            max_players: 4,
            votes_to_skip: 2,
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
            ROOM: XYCSDG
        </h2>
        <p className="text-light-3 small-medium md:base-regular text-center mt-2">
            In this game, only the best emerge victorious.
        </p>

        <Form {...form}>
        
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="flex-center flex-col gap-5 ml-4 mt-4 mb-4">
            <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
                <FormItem className="space-y-3">
                <FormLabel className="font-bold">Who won the last world cup tournament...</FormLabel>
                <FormControl className="">
                    <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                    >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="liga1" />
                            </FormControl>
                            <FormLabel className="font-normal">France</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="champions-league" />
                            </FormControl>
                            <FormLabel className="font-normal">Argentina</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="world-cup" />
                            </FormControl>
                            <FormLabel className="font-normal">Spain</FormLabel>
                        </FormItem>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <div className="flex flex-row mt-2">
                <Button type="button" className="shad-button_red m-1">
                    <Link className="nav-link" to="/rooms-home">LEAVE</Link>
                </Button>
                <Button type="button" className="shad-button_blue m-1">
                    SKIP
                </Button>
                <Button type="submit" className="shad-button_green m-1">
                    ANSWER
                </Button>
                
            </div>

            {isHost ? (
                <Button type="submit" className="shad-button_primary w-full m-1">
                    SETTINGS
                </Button>
            ) : (<></>)}
            

            {/* <Button type="button" className="shad-button_red w-40 m-1">
                <Link className="nav-link" to="/rooms-home">LEAVE</Link>
            </Button> */}
        </form>
        </Form>
        
    </div>
    )
}

export default Room;