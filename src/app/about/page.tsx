import Rating from '@/app/Rating'
import Header from '@/app/Header'

export const metadata = {
    title: 'About - Sole Searcher',
    description: 'Information about the Sole Searcher app.',
}

const people = [
    {
        name: 'Rob Speiden',
        role: 'Technical Director, Research',
    },
    {
        name: 'Joel Serano',
        role: 'Data Analysis and Modeling',
    },
    {
        name: 'Jess Mink',
        role: 'Data Model Implementation',
    },
    {
        name: 'Brian Cohan',
        role: 'UI/UX, App Development, Deployment',
    },
]

export default function About() {
    return (
        <div className='flex flex-col gap-4'>
            <Header as='h1' className='text-3xl'>About</Header>

            <Header as='h2' className='text-2xl'>How to Find Your Sole</Header>
            <p>There are three metrcis used to determine track length. In order of preference, they are:</p>
            <ol className='mx-auto ml-8 list-decimal'>
                <li>Insole Length</li>
                <li>Nominal Shoe Size</li>
                <li>Subject Height</li>
            </ol>
            <p>
                The Predicted range shown will be based on the best metric available. If you have data for multiple metrics, the
                data ranges will be visible in the details section.
            </p>

            <Header as='h2' className='text-2xl'>Instructions</Header>

            <Header as='h3' className="flex items-center gap-2"><Rating stars={3} />Insole length
            </Header>
            <p>
                Insert the leading edge of a tape measure into the footwear. Ensure the tape measure extends to the front of the
                toe box. Hold the tape measure flat against the floor of the insole. Bend the tape at the rear edge or rise of
                the heel. The reading at the heel is made as closely as possible to the point at which the rise (vertical slope)
                equals the run (horizontal aspect).
            </p>
            <p>
                If possible, measure multiple items of footwear and use the average of the measurements. Ensure the proper units
                are selected. If using fractional inches, it must be converted to decimal.
            </p>

            <Header as='h3' className="flex items-center gap-2"><Rating stars={2} />Nominal Size
            </Header>
            <p>
                Indicate nominal size in whole or half-size increments. Make sure to set the correct footwear size type:
                Men&apos;s, Women&apos;s, or Youth.
            </p>

            <Header as='h3' className="flex items-center gap-2"><Rating stars={1} />Subject Height
            </Header>
            <p>
                Indicate the subject&apos;s height. Make sure to set the correct measurement units and the subjects sex at
                birth. (The correlations for track length are based on geneitcs rather than gender identity.)
            </p>

            <Header as='h2' className="text-2xl">Credits</Header>
            <table className='table-auto'>
                <tbody>
                    {people.map((person) => {
                        return (
                            <tr key={person.name}>
                                <td className='px-3 py-1 whitespace-nowrap'>{person.name}</td>
                                <td className='px-3 py-1 whitespace-nowrap'>{person.role}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
