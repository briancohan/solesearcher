import Header from '@/app/server_components/Header'

export const metadata = {
  title: 'About - Sole Searcher',
  description: 'Information about the Sole Searcher app.',
}

const people = [
  {
    name: 'Rob Speiden',
    role: 'Technical Director, Research, Data Analysis',
  },
  // {
  //   name: 'Joel Serano',
  //   role: 'Data Analysis and Modeling',
  // },
  // {
  //   name: 'Jess Mink',
  //   role: 'Data Model Implementation',
  // },
  {
    name: 'Brian /Root/ Cohan',
    role: 'App Development, Data and Modeling Review',
  },
]

export default function About() {
  return (
    <div className='flex flex-col gap-4'>
      <Header as='h1' className='text-3xl'>
        About
      </Header>

      <Header as='h2' className='text-2xl'>
        How to Find Your Sole
      </Header>
      <p>There are three metrcis used to determine track length. In no particular order, they are:</p>
      <ol className='mx-auto ml-8 list-decimal'>
        <li>Insole Length</li>
        <li>Nominal Shoe Size</li>
        <li>Subject Height</li>
      </ol>
      <p>
        The predicted range shown will be based on the metrics available. If you have data for multiple metrics, the
        data ranges will reflect the overall minimum and maximum value.
      </p>

      <Header as='h2' className='text-2xl'>
        Instructions
      </Header>

      <Header as='h3' className='flex items-center gap-2'>
        Insole length
      </Header>
      <p>
        Insert the leading edge of a tape measure into the footwear. Ensure the tape measure extends to the front of the
        toe box. Hold the tape measure flat against the floor of the insole. Bend the tape at the rear edge or the rise
        of the heel. The reading at the heel is made as closely as possible to the point at which the rise (vertical
        slope) equals the run (horizontal aspect).
      </p>
      <p>
        If possible, measure multiple items of footwear and use the average of the measurements. Ensure the proper units
        are selected. If using fractional inches, it must be converted to decimal.
      </p>

      <Header as='h3' className='flex items-center gap-2'>
        Nominal Size
      </Header>
      <p>
        Indicate nominal size in whole or half-size increments. Make sure to set the correct footwear size type:
        European, Men&apos;s, Women&apos;s, Youth, or Child.
      </p>
      <p>
        If footwear is labeled as Men&apos;s or Women&apos;s, those categories are used in this app, as well as European
        sizes. Due to a variety of terms used to describe U.S. sub-adult shoe size categories (e.g., kids, child, youth,
        junior, boys, girls, toddler), this app condenses them into two categories - Child and Youth - by these
        criteria:
      </p>
      <p>Sizes 1 to 8 outsole length less than 200mm (8 inches) are categorized as Child&apos;s.</p>
      <p>Sizes 1 to 8 footwear with outsole lengths greater than 200mm (8 inches) are categorized as Youth.</p>
      <p>
        Footwear sized 8 ½ to 13 ½ with outsole length less than 240mm (9 ½ inches) are categorized as Child&apos;s.
      </p>
      <p>Footwear sized 8 ½ to 13 ½ with outsole length greater than 240mm (9 ½ inches) are categorized as Youth.</p>
      <div className='grid max-w-2xl grid-cols-3 gap-6 py-8 mx-auto text-center'>
        <div>Nominal Size</div>
        <div>Child</div>
        <div>Youth</div>

        <div>1 - 8</div>
        <div>&lt; 200 mm / &lt; 8 in</div>
        <div>&gt; 200 mm / &gt; 8 in</div>

        <div>8.5 - 13.5</div>
        <div>&lt; 240 mm / &lt; 9.5 in</div>
        <div>&gt; 240 mm / &gt; 9.5 in</div>
      </div>

      <Header as='h3' className='flex items-center gap-2'>
        Subject Height
      </Header>
      <p>
        Indicate the subject&apos;s height. Make sure to set the correct measurement units and the subject&apos;s sex at
        birth. (The correlations for track length are based on genetics rather than gender identity.)
      </p>

      <Header as='h2' className='text-2xl'>
        Disclaimer
      </Header>
      <p>
        Data used to train and validate prediction models were gathered from convenience and snowball sampling methods.
        As a result of no random sampling techniques, these results are not generalizable to any population, specific or
        general. Data measurements were made by one person; inter-observer error has not been described, and will likely
        vary more (have larger errors and wider prediction intervals) than these results.
      </p>
      <p>
        These prediction intervals are not indicative of identification, but likelihood that a missing person COULD HAVE
        MADE a particular footprint or shoeprint (tracks), and associated uncertainty. In other words, just because a
        track length falls within the prediction intervals for the missing person, that does NOT mean that the missing
        person made that track. These intervals do describe the probability that a person exhibiting the characteristics
        entered into the app could have made a track with a certain length. These results are intended to be used as a
        guide to assess relevance of footprints or shoeprints to a missing person search. It is important to employ
        multiple-factor reasoning (including track age, gait pattern, subject mobility, footwear information,
        accompanying tracks, and other factors) when assessing footprint or shoeprint relevance to a missing person
        scenario.
      </p>
      <p>
        This app assumes that a full track length is measurable - some incomplete track lengths can be estimated, but
        the resulting predictions are less applicable to track length estimates.
      </p>
      <Header as='h2' className='text-2xl'>
        Credits
      </Header>
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
