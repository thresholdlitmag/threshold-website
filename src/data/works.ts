/**
 * The gallery "database".
 *
 * Each published work is one record here, with the same fields you would
 * use in a real database table:
 *
 *   title     — name of the piece
 *   type      — "poetry" | "prose" | "art"
 *   medium    — art only (e.g. Watercolor, Digital, Mixed Media, Acrylic)
 *   author    — the contributor's name
 *   edition   — which edition of Threshold it appeared in
 *   excerpt   — short preview shown on cards (writing only)
 *   fullText  — the complete piece, shown on the work's own page.
 *               Use a blank line between stanzas/paragraphs; for poetry,
 *               plain line breaks within a stanza are preserved.
 *   imageUrl  — art only. Either:
 *                 • a file committed to this repo's public/art/ folder,
 *                   referenced as "/art/filename.jpg"  (recommended), or
 *                 • a full https:// link to an image hosted elsewhere
 *                   (Imgur, Google Drive direct link, etc.)
 *   featured  — true on ONE work: it becomes the Home page hero
 *   highlight — true on works shown in Home's "Recent Highlights" row
 *
 * Every work automatically gets its own page at /gallery/<id>.
 */

export type WorkType = "poetry" | "prose" | "art";

export interface Work {
  id: string;
  title: string;
  type: WorkType;
  medium?: string;
  author: string;
  edition: string;
  excerpt?: string;
  fullText?: string;
  imageUrl?: string;
  featured?: boolean;
  highlight?: boolean;
}

export const EDITIONS = ["Issue XXXIX — Spring 2026"] as const;

export const LATEST_EDITION = EDITIONS[0];

export const WORKS: Work[] = [
  {
    id: "w1",
    title: "O’ Great Goddess Durga",
    type: "poetry",
    author: "Bastion Price",
    edition: "Issue XXXIX — Spring 2026",
    excerpt:
      "The great goddess Durga, embodiment of power / An array of 16 arms, like petals of a flower / Each holding a weapon, of each there are only one / Grinning cheekily after a battle easilly won",
    fullText: 
      `The great goddess Durga, embodiment of power
      An array of 16 arms, like petals of a flower
      Each holding a weapon, of each there are only one
      Grinning cheekily after a battle easily won
      
      O’ great goddess Durga, how strong are you so?
      To easily vanquish such a violent, terrible foe
      As Mahisha-asura, the demon buffalo
      With which no other than you could go toe to toe
      
      With such a loyal companion, a dog biting the toe
      Of the great evil beast that comes from below
      Serving as a stand, a pillar of support
      None less loyal than you could help fight this sort
      
      O’ great goddess Durga, why treat your companion so?
      As to step on him like a soft pile of snow
      Or perhaps this is an agreement, the dog doesn’t mind
      Maybe this companion is just far too kind
      
      This evil, wretched pest, a demon, a worm
      You thought you could hide from us your true form?
      Well we all see you now, demon as you are
      Hung by the hand of Durga’s great arm
      
      O’ great goddess Durga, you rid us of this plague
      That must have hatched from the most rotten egg
      You will get no mercy, not from her nor we
      For all of the lives you slaughtered like innocent sheep`,
  },
  {
    id: "w2",
    title: "Abandoned",
    type: "prose",
    author: "Cora Lin",
    edition: "Issue XXXIX — Spring 2026",
    excerpt:
      "Mahishasura flew at Durga, and Durga killed him; Brahma’s blessing left the demon immune to man, god, and beast, but he had left a loophole—a woman’s hand. Mahishasura was the reason for her birth, and now she was the reason for his death.",
    fullText: 
      `Mahishasura flew at Durga, and Durga killed him; Brahma’s blessing left the demon
      immune to man, god, and beast, but he had left a loophole—a woman’s hand. Mahishasura was
      the reason for her birth, and now she was the reason for his death. The lord of the gods’ mistake
      was now resolved in blood; the metallic scent filled the air, thick enough to taste. The gods and
      the people praised Durga, called her Mahishasuramardini, slayer of Mahishasura, and for a
      moment she was the greatest being in all the realms. Gold and jewels shining in the light,
      weapons edged in red, she was the image of victory, an avenging angel for all to behold. Below
      her, Mahisha’s body leaked crimson.
      
      And then she was gone. A woman, Mahishasuramardini now learned, was a warrior only
      in a time of crisis. Without that crisis—without Mahisha—Durga was unnecessary, an aberration
      in the natural order of male warriors. She disappeared from the world, to be called if another
      catastrophe occurred, because when else would she be useful? To clean house, and cook food,
      and raise children? Certainly not. So the goddess was gone from the world, and her lion was
      taken with her, and all was right again. Or, if not right, better than it would be if she stayed.
     
      In a world outside the world, Mahishasuramardini waited. First, she spent the days
      exploring her new home, a place that was Earth’s mirror sans population. The goddess and her
      lion prowled the abandoned lands, lush of foliage yet desolate of men. Trees towered overhead,
      casting the pair in shadow; her cat hunted not for food—they needed none—but to pass the time.
      This, she gathered, was the land of the gods—but the land of the gods, too, had no use for a
      woman warrior. Her lion did not age, and she realized that she did not either; she only waited.
      
      Eventually, the goddess was called, and she answered—vanquished the demons and
      reveled in her brief escape. The humans she saved hailed her as a manifestation of Durga, there
      and gone again while she was needed. I am not a manifestation, she wanted to say. I am a
      person. My own person. But the second she started to speak, she was gone again, back to the
      lonely land of the gods. A manifestation no longer invoked, there she stood. In that moment, she
      cursed them all—her creators, who had cast her aside, whose beck and call she was still 
      obligated to answer; their followers, who abused her power never knowing the cost. She cursed 
      this other Durga, whoever she was, who was useful when she was not.
      
      And forever, she waited, a fog settling over her heart.
      
      One day, she was called again. The voice was different, as they always were. She
      appeared, as she always did. She was in a dim, cramped room, hardly fit for the summoning of a
      goddess. Low-burning lamps filled the room with the smell of oil, overpowering the soft scent of
      wet stone. A man was on his knees before her, hands clasped in prayer. “Goddess
      Mahishasuramardini,” he started, his voice trembling, “I give to you this offering.” He held up
      something in his hands: a small sculpture of brown stone, depicting a woman with sixteen arms
      standing atop a lion and the body of a buffalo, a demonic man leaping at her from the buffalo’s
      severed neck. The scene was framed in flowers and impossible swirls of stone. The goddess
      frowned. It was beautiful, certainly, but what purpose was there in an offering to her, the eternal
      wraith of the land of the gods?
      
      And then, with a rush, she remembered. Blood on her tongue, her swords, in the air. The
      give of the body of Mahisha’s buffalo form beneath her foot. The shine of golden bangles and
      earrings, flecked with glossy red. The hollow, shining praise of gods and men alike, on their
      knees the way this man—this sculptor—was now. She recalled every detail of the moment of 
      glory rendered in exacting miniature before her. The sparkling second before she was discarded,
      betrayed, tossed away when her purpose was done.
      
      Mahishasuramardini would not be cast aside again.
      
      The goddess took the sculpture. Intricately carved and now full of meaning, it was the
      greatest gift ever given to her; certainly her life, intended to be spent in others’ wars, could not
      compare. The light of the oil lamps reflected off its surface, making it seem to glow. “Thank
      you,” she said. “I will treasure this.” The sculptor’s canny eyes began to angle upward—
      And then, once again, she was gone.`,
  },
  {
    id: "w3",
    title: "Loving Feathers",
    type: "art",
    medium: "Acrylic",
    author: "Kina Xu",
    edition: "Issue XXXIX — Spring 2026",
    highlight: true,
    imageUrl: "/art/lovingfeathers.jpg",
  },
  {
    id: "w4",
    title: "fluffy white clouds",
    type: "poetry",
    author: "Ojasvi Ramani",
    edition: "Issue XXXIX — Spring 2026",
    excerpt: 
      "they were hung up a little too high / fasted with tape and barely sticky adhesive / we teetered tall on our ladder / my hand barely reaching the dusty corners",
    fullText: 
      `they were hung up a little too high
      fastened with tape and barely sticky adhesive
      we teetered tall on our ladder
      my hand barely reaching the dusty corners
      the 2 feet you had on me felt like miles apart
      we argued about placement as sisters do
      and who got to add the last sticker
      there were always little things to complain about
      we don’t argue anymore
      after a trip to IKEA and a haul of decorations
      we accessorized together
      but i had my own room
      coated in the buttery walls
      the large painted tree
      i whined about for years
      still shines against the now dull background
      the clouds framing your bright blue walls
      have begun to fade
      slowly peeling from their spots high up
      they complement the background
      of every facetime
      your image furnished with
      skyscrapers and workshops
      i used to wish i lived in your room
      protected by the barrier of clouds
      curling up next to you
      with tales of wizards and nonsense
      whispering through the air
      the tiny bathroom that separated us
      felt like miles between our rooms
      now the miles pile up
      as our minutes become short
      the clouds
      that frame the bright blue walls
      felt comforting in our little years
      but as i shiver through the winter
      work and stress
      reaching the clouds in the corner
      i realize the warmth
      that circled through this room
      existed only because of you`,
  },
  {
    id: "w5",
    title: "Sin Stubborn",
    type: "poetry",
    author: "Kobimtochi Obi",
    edition: "Issue XXXIX — Spring 2026",
    excerpt:
      "the serpent's fruit / didn't leave me with childbirth / but it did bless me with stubborn hands / that creep south / splaying around in all things Eve",
    fullText:
      `the serpent’s fruit 
      didn’t leave me with childbirth
      but it did bless me with stubborn hands
      that creep south
      splaying around in all things Eve

      she cuts her lips open
      morphs her words
      from dust
      to wind 
      to music
      tell me more 
      about fields that savour sun 
      and tilt you to an earth-bound heaven
      about girls who leave you moons
      full of harsh white craters
      rejection painted in each one     
      
      when she asks why my hand lingers
      like the last dance at a masquerade ball
      i tell her i’m bearing a sin
      as we sit in our makeshift hell each afternoon
      burning from our cancer-giving star
      the push/pull/stop it of our bodies      
      
      we let ouroboros mold us
      hoping to never return to dust
      her teeth sickle into me
      i taste of reprieve
      lust and scales 
      
      my skin has spent too many shades of red
      still my hands are nailed to her axis
      my blood desecrating the garden
      fleeing from 
      stars
      hells
      and girls.`,
  },
  {
    id: "w6",
    title: "Hideaway",
    type: "art",
    medium: "Mixed Media",
    author: "Moubon Ray Kurukumbi",
    edition: "Issue XXXIX — Spring 2026",
    imageUrl: "/art/hideaway.jpg",
  },
  {
    id: "w7",
    title: "Free Birds",
    type: "prose",
    author: "Justin Yu",
    edition: "Issue XXXIX — Spring 2026",
    excerpt:
      "When we first arrived in America, it was all over the news. “From Virginia Suburb, a Dissident Chinese Writer Continues His Mission,” reported The New York Times, along with a picture of my parents holding a three-year-old me. ",
    fullText: 
      `When we first arrived in America, it was all over the news. “From Virginia Suburb, a Dissident 
      Chinese Writer Continues His Mission,” reported The New York Times, along with a picture of my 
      parents holding a three-year-old me. From Time Magazine: “Facing Censorship and Abuse, a Chinese 
      Writer Chooses Exile.” You get the gist. My father was praised in pretty much all the big-name 
      Western newspapers as one of China’s most prominent dissident essayists and critics. The adults in my 
      life, from my friend’s parents to my teachers to the people in church, all knew our story and therefore 
      made the logical assumption that such an inspirational figure of a father must surely be a hero in my 
      young eyes. However, I must confess to a different story. 

      Growing up, I never had the strongest connection with my father. This was mainly because I 
      could not understand why I was so different from everyone else: I spoke English with an accent, ate 
      different food, and found it hard to make friends among my mostly white classmates. While other kids 
      brought foods like fried chicken for lunch, I brought fried tofu. My classmates went to church on Sundays; 
      I went to Chinese school. Complaints and accusations towards my father constantly occupied my thoughts. 
      Why did I have to live somewhere where I clearly didn’t belong? Why couldn’t we just live in China, where 
      everyone looked and acted like us? I did not understand my father, and I understood even less why he chose 
      such a difficult path for himself and his family. In short, I harbored a grudge. 
      
      Additionally, it wasn’t just about me (though like all young children I rarely had thoughts beyond myself). 
      My father unquestionably had it even worse. Already well into his 40s, he possessed neither the cognitive 
      flexibility nor social integration skills that a child such as me had. An immigrant’s life is difficult. He 
      could barely speak English, did not have a driver’s license, and all in all was about as useful in America 
      as a one-legged man in a butt-kicking competition. It did not help that my mother would always tell me: 
      “If your father wrote books in China, we would be millionaires.” “Well then, why didn’t he?” I’d ask. The 
      answer would be the same I’d always get whenever I unwisely decided to vocalize my grievances, and that was 
      “freedom,” which only served to increase my frustrations. What did a little freedom here and there matter 
      if we could be rich? If we could belong? If I didn’t have to speak for my own dad when out buying groceries 
      because he was ashamed of his poor English? If I didn’t have to feel embarrassed of my parents every time 
      my friends came over to my house? 
      
      As a result, my relationship with my father became strained and distant, characterized by filial piety rather 
      than love. We hardly spoke to each other; the only interaction we’d have was when he drove me to school, and 
      those long rides would be silent and tense. I recall having once valued my best friend at the time over my parents—a 
      thought that no child should have about the ones who raised them. Disconnected from both my peers and my parents, 
      I sought refuge in books. I became friends with the juvenile delinquents that frequent children’s fiction, bonding 
      with them through familial issues and alienation in school. However, this did not mend my estranged relationship 
      with my father—it only distracted me from it. 
      
      For my twelfth birthday, my father gave me a book. This was Stephen King’s Rita Hayworth and Shawshank Redemption. 
      I accepted it begrudgingly—birthdays were one of the few occasions on which we conversed. He told me, “Read this 
      book. It will help you understand my story.” As a recalcitrant prepubescent, my disconnect with him was greater 
      than ever. It was almost as if we were co-tenants rather than family. Although I was initially reluctant to read 
      the book (I willfully refused to have anything to do with him at the time), my curiosity got the better of me and 
      I found myself opening the front cover before I knew it. 
      
      Rita Hayworth and Shawshank Redemption, or The Shawshank Redemption for short, is about a man named Andy Dufresne 
      who has been wrongly incarcerated for murder and is sentenced to life imprisonment in a prison called the Shawshank 
      State Penitentiary (Shawshank for short). Despite the injustices of the system, however, Andy did not despair: 
      “His eyes never got that dull look. He never developed the walk that men get when the day is over and they are going 
      back to their cells for another endless night—that flat-footed, hump-shouldered walk. Andy walked with his shoulders 
      squared, and his step was always light.” Andy endured through the humiliation and pain and made sedulous plans for 
      his escape by digging a chunk out of the wall every night with a rock hammer, covering the hole up with a poster of 
      Hollywood star Rita Hayworth. After over two decades, Andy finally escapes through the tunnel he dug, achieving the 
      freedom he had long fought for. 
      
      Shawshank, like all prisons, is a place completely devoid of freedom. As described in the book, “You are told when to 
      eat, when you can write, when you can smoke. If you’re at work in the laundry or the plate-shop, you’re assigned 
      five minutes of each hour when you can go to the bathroom.” As I read through the novella, three things happened. The 
      first: I became more and more absorbed in the story, following Andy’s escapades eagerly. The second: I became increasingly 
      aware of the similarities between The Shawshank Redemption and the story of my family, especially as my father explained 
      more and more of his story. The third: I developed a new and profound appreciation for the freedom I had taken for 
      granted my whole life. 
      
      The strict rules, constant surveillance, and corrupt officers of Shawshank were just like China, I realized. However, 
      China was worse—it was both larger in scale and imprisoned free citizens rather than convicted felons. Dissent is 
      not tolerated, and the power of the authorities is total and crushing. Citizens of China, much like the inmates of 
      Shawshank, lack fundamental freedoms such as speech, expression, and the right to privacy. People living in such 
      conditions will often lose the fundamental yearning for freedom that exists inherently in everyone: “When you take 
      away a man’s freedom and teach him to live in a cell, he seems to lose his ability to think in dimensions. He’s like 
      a jackrabbit, frozen in the oncoming lights of the truck that is bound to kill it.” 
      
      My father could not live like this. Like Andy, he knew how important freedom was and was willing to do anything he 
      could to have it. Unlike much of the Chinese population, my father was not content with living under authoritarian 
      rule: “Maybe it was only a sense of freedom, even inside these goddamned gray walls. It was a kind of inner light 
      he carried with him.” Because of this, he became a dissident, attacking the corrupt Chinese government not by force 
      but with words and ideas, essay after essay, book after book. Of course, the government did not take this lying 
      down—they placed both of my parents under house arrest, forcing them to send the then-two-year-old me hundreds 
      of miles away to live with my grandparents for my safety. Although the reasons for their respective wrongful 
      incarcerations were different, both Andy and my father were innocent men who had been unjustly stripped of their 
      freedom. 
      
      Twenty-four hours a day and seven days a week my parents were kept under surveillance. Guards were stationed 
      outside their apartment, cameras were set up along the property, and telephone lines were tapped. When my mother 
      became deathly ill from a high fever, the authorities wouldn’t even let her go to the hospital for treatment. On 
      another occasion, my father was abducted by the police in the middle of the night. They took him to a black site 
      (an illegal detention center that officially does not exist), stripped him bare, and proceeded to break his fingers, 
      kick him, and burn his skin with cigarette butts. This was what happened to those who defied the government. In The 
      Shawshank Redemption, Andy Dufresne managed to escape from Shawshank after 27 years. He did so by slowly chipping 
      away at a hole in his cell wall with a rock hammer and then crawling the length of five football fields through 
      sewage and excrement. While my father’s escape from China was less dramatic, it was no less inspiring. After enduring 
      years of house arrest and being beaten nearly to death by the Chinese police, he chose exile for himself, my mother, 
      and I, and we fled overseas to a strange and unfamiliar new country. A country of freedom. 
      
      Right before Andy makes his escape in The Shawshank Redemption, he talks with his friend, Red, about Zihuatanejo, a 
      place on the coast of Mexico which he describes as “a warm place that has no memory.” The open skies and endless 
      blue ocean of Zihuatanejo symbolize freedom, contrasting the oppressive gray walls of Shawshank. It is a place 
      without fear. Andy successfully makes his way to Zihuatanejo after he escapes and entreats Red to follow his 
      footsteps when he is released. At the very end of the book, Red is finally freed after 38 years of imprisonment and 
      decides to try to meet up with Andy. He tells us, “I find I am excited, so excited I can hardly hold the pencil in 
      my trembling hand. I think it is the excitement that only a free man can feel, a free man starting a long journey 
      whose conclusion is uncertain.” For my family, Zihuatanejo was America. Freedom of speech, freedom of the press, 
      freedom of religion; all that my father had fought for was in this free land. It was a new beginning. The future 
      for us was uncertain as well, having traveled thousands of miles to a strange and distant world, but it was this 
      uncertain future that held for us countless possibilities and choices. It held freedom.
      
      When I finished reading The Shawshank Redemption, I was at a loss for words. How could I have been so obtuse? 
      It was as if I had been that dazed jackrabbit, frozen and uncomprehending of the sacrifices that my parents had 
      made for the sake of our family. As a child who had always been free, shielded from the cruelties of the world 
      by the two mighty pillars that were my parents, I had recognized neither the value of my freedom nor the sacrifices 
      that had been made for me to live the way I did. I had never had my freedom taken away from me, so I had not realized 
      its value. Although of course reading about something cannot be compared to truly experiencing it, I now understood 
      both my father and the value of freedom better. I gained a newfound respect for him—something that should have been 
      there all those years but had only finally blossomed now. Additionally, my relationship with both of my parents started 
      improving. By the time of writing, I am sixteen years old and can confidently say that I am proud of my family. 
      I am proud of how we got here. 
      
      The Shawshank Redemption has become not only a part of my parents’ lives, but a part of my own life as well. Andy’s 
      story has merged with the story of my family. It is a story of freedom. There is a quote from the book that goes 
      like this: “Some birds are not meant to be caged, that’s all. Their feathers are too bright, their songs too 
      sweet and wild.” I now know that my father is such a free bird. And so, too, am I.`,
      featured: true,
  },
  {
    id: "w8",
    title: "The Sea",
    type: "art",
    medium: "Acrylic",
    author: "Olivia Kim",
    edition: "Issue XXXIX — Spring 2026",
    imageUrl: "/art/thesea.jpg",
  },
  {
    id: "w9",
    title: "The Sound of Spring",
    type: "poetry",
    author: "Kobimtochi Obi",
    edition: "Issue XXXIX — Spring 2026",
    excerpt: "Every evening, I hope I find a hare on my doorstep. / * / Winter had marched all over my spirit the first time I met you. My coat had lived a far more exciting life than me, with holes all over to tell it.",
    fullText: 
      `Every evening, I hope I find a hare on my doorstep. 
     
      * 
      
      Winter had marched all over my spirit the first time I met you. My coat had lived a far more 
      exciting life than me, with holes all over to tell it. The cold breeze had condensed into my bones. I 
      trudged to my front door with the quick of a mole burrowing back into the earth. I heard a sparkle and 
      a chime, the pelt of rain and the buzz of bees, and there you were. My spring in that unbecoming 
      winter. 
      
      * 
      
      Without any question, you had made yourself at home in a house I never saw as more than a shack. At 
      first, you held back from me, nearly inconspicuous. You slinked around silent, a midnight cat. I would 
      feel my hairs stand up as you inched past me, sleek and still in such a manner I thought you a ghost. 
      But one day, I came in with the cool winter crystals, and you were light. Warm, bright, and more 
      colours than I could describe, you sat still on the couch, eating corner store candy, as if you were 
      something mundane. And me, spellbound and stupid, I gave you no remarks and went straight to bed. 
      
      * 
      
      By the next morning, you were a raven. As your wings cast a shadow on my already 
      shameful face, I heard something in me croak out a cry alongside your caw. I knew you would be 
      leaving me soon. 
      
      * 
      
      You had begun to dissipate with the snow. Raven. Crow. Finch. Mouse. In those last slivers 
      of winter, I probably stepped on you once or twice. I searched for your shadows and sheddings each 
      evening, creeping around the house, while you slumbered. Desperate for warmth, I ravaged in your 
      remains. 
      
      
      You and I, contracted within ourselves, in that already squeezingly small shack. Even now, I 
      couldn’t begin to understand why you had come to me. 
      
      * 
      
      When the sun struck spring, I woke up in the pale morning glow to hear a sparkle and a 
      chime, the pelt of rain and the buzz of bees. You were an earthworm by then. But on that day, you 
      didn’t pity me as I watched through the crack of my door. You showed me it all, as you sprung up, 
      contorting, writhing and gushing. I didn’t think you could ever be disgusting, something heavier than 
      dew drops, louder than falling leaves. The rings on your mucus skin turned vertical, into sharp russet 
      fur. The roundness of your body clenched into angled and awkward limbs. 
      
      Your yellow eyes burned worse than any frostbite. 
      There’s still a rash right where you looked. 
      
      * 
      
      I blinked as I heard 
      a metronome pitter-patter 
      on the hardwood floor, 
      and a faint shut 
      of the front door. 
      
      *`,
      highlight: true,
  },
  {
    id: "w10",
    title: "Elegy for Sunday Novenas",
    type: "poetry",
    author: "Kobimtochi Obi",
    edition: "Issue XXXIX — Spring 2026",
    excerpt:"“You are sitting on the hand of God. / Continue to play. / I know where I will find myself on Judgment Day.” / my father says he has already decided my fate.",
    fullText: 
      `“You are sitting on the hand of God.
        Continue to play.
        I know where I will find myself on Judgment Day.”
        
        my father says he has already decided my fate.
        
        the leather couch doesn’t let me sink in.
        the jesus statue lords over the room,
        a supreme judge.
        the family picture,
        where my eyes crease up too much,
        bears witness.
        the air hums with anaphylaxis,
        closing in on me,
        before it bursts.
        i feel my teeth begin to gnash. 
        
        i am not my father,
        on his knees in that decaying bungalow,
        his waiting palms, expectant and reproachful,
        as pain sank in, a cold sweat, 
        with every lash of his father’s belt.
        
        i am not my mother,
        dragged through the streets of Lagos,
        for long legs shown too eagerly,
        skirts shorter than the length of youth love,
        her hair tearing apart in her mother’s grip.
        
        when they find me in bed,
        sorry, saccharined and red all over,
        feasting on boyhood: 
        Peters, Lukes, and Phillips,
        
        i tax the night’s peace, 
        playing wind gods
        with the boys
        who’d just been saving their souls
        under my skirt.
        
        my father says i am nothing more than his antithesis. 
        running with no sense. 
        stowed away with no future.
        
        as dusk sneaks in, 
        i bundle up on the cold linoleum of the bathroom floor, 
        earbuds draped round me like a chaplet,
        and debate finding god.
        
        maybe he's in the mouth of the girl i carpool with 
        or an embrace with my mother.`,
  },
  {
    id: "w11",
    title: "six suitcases and three years",
    type: "poetry",
    author: "Audrey Na",
    edition: "Issue XXXIX — Spring 2026",
    excerpt: "three years ago, / when i’d visit you, / you’d tell me how beautiful i was, / how much i’d grown.",
    fullText: 
      `three years ago, 
      when i’d visit you, 
      you’d tell me how beautiful i was, 
      how much i’d grown.
      
      a year ago, 
      when we came, 
      you told my sister 
      she needed to grow more— 
      “drink more milk,” 
      you’d tell her. 
      every hour, on the hour, 
      a constant refrain 
      echoing and echoing. 
      
      when my dad used to visit you, 
      you’d spoil him with food— 
      make kimchi and mandu from scratch, 
      cook bulgogi and galbi and doenjang jjigae, 
      take him out to korean barbecue, 
      buy him gimbap from h-mart, 
      and burgers from in-n-out. 
      he probably preferred the food you made him 
      to the peanut butter and jelly sandwiches 
      he made himself at home. 
      
      and now he's the one who visits you, 
      and buys you gimbap. 
      he’s the one who takes you out to korean barbecue. 
      he’s the one who has to stop you from cooking 
      because you can no longer remember. 
      
      and then days fly by, 
      each one heavier than the last. 
      and so dad’s flying out 
      every other week 
      to visit you, 
      because you can’t be alone. 
      
      and then i’m sitting in a car, 
      driving to a swim meet, 
      hearing that there’s only twenty four months left, 
      and wondering what happened. 
      and how only two years ago, 
      i was visiting you and you still knew my name. 
      you were still able to play golf 
      and walk for hours.
      
      and week after week 
      dad keeps flying 
      to see you. 
      until grandpa finds you on the floor 
      not knowing how you got there, 
      and things change again. 
      
      so now you’re eating your last burger 
      from in-n-out, 
      the animal sauce dripping, 
      the grilled onions crunching. 
      and you don’t even like it anymore. 
      it’s too salty, you say. 
      
      and then the day comes. 
      and suddenly six suitcases stand behind you in the car. 
      how can you realize you’re not going on a trip 
      but not remember my name? 
      how can you realize you’re moving away, 
      but not know your son’s older than twenty five? 
      how can that thought keep looping in your mind, 
      the same question repeating 
      for an hour? 
      how can you know that those six suitcases hold your world, 
      but not remember mine? 
      
      how can eighty years of living be packed up, 
      and then all that’s left 
      is an empty house? 
      six suitcases full of your stuff. 
      everything in six suitcases. 
      
      and now my throat’s tight 
      when i think of you, 
      only a shadow of who you were. 
      and how can so much change in three years? 
      
      three years, 
      six suitcases, 
      and nothing is the same. 
      just echoes where memories used to be.`,
  },
  {
    id: "w12",
    title: "Taiwanese Popcorn Chicken",
    type: "prose",
    author: "Justin Yu",
    edition: "Issue XXXIX — Spring 2026",
    excerpt: "Ever since I was six years old, my family has been going to Taiwan for the summer. We’ve done this for eight summers now, and I think I can say with some degree of confidence that the greatest joy I found in Taiwan took the form of night markets.",
    fullText: 
      `Ever since I was six years old, my family has been going to Taiwan for the summer. We’ve done this for 
      eight summers now, and I think I can say with some degree of confidence that the greatest joy I found 
      in Taiwan took the form of night markets. These bustling, lively collections of street food vendors and 
      stores are the epitome of what I call a good time. I had many favorites: savory niu rou mien (beef 
      noodle soup); pungent, umami stinky tofu; and fresh and sweet sugarcane juice that seemed to be the 
      liquid form of sunshine were all musts. But the one food that reminds me the most of our annual 
      Taiwan trips is the popcorn chicken. 
     
      Now, McDonald’s may call their meals happy, and KFC might be “finger lickin’ good,” but the true 
      king of fried chicken is found in the street vendors of Taiwan, amidst the bubbling boba tea stores and 
      mom and pop noodle shops. Crunchy on the outside yet succulent on the inside, these golden goodies 
      leave you forever wanting more. When paired with the aromatic flavor of Thai basil leaves (my personal 
      favorite), the taste and texture become truly otherworldly. They made me feel like an adult: walking 
      around and eating past eleven o’clock was something I was usually never allowed to do. 
      
      Back in America, there are some imitations of Taiwanese popcorn chicken that surprisingly do a pretty 
      good job—from bubble tea places like Vivi’s to fine dining such as Peter Chang. However, I believe 
      that any popcorn chicken made in America lacks the essence of what makes it special to me: late 
      summer nights in Taiwan, a young me holding my mother’s hand as we navigate the markets crowded 
      with people, shops, and smells. This feeling of freedom I once derived is now just the nostalgic twang 
      of a happy childhood summer. 
      
      High school has kept me bogged down in the States for the past four years. But after I graduate, I look 
      forward to nothing more than returning to Taiwan and buying another serving of that delicious 
      popcorn chicken. Maybe, just maybe, for the briefest of instants, I can become a carefree child once 
      more.`,
  },
  {
    id: "w13",
    title: "Life in a Blur",
    type: "art",
    medium: "Photography",
    author: "Kutay Baygin",
    edition: "Issue XXXIX — Spring 2026",
    imageUrl: "/art/lifeinablur.jpg",
  },
  {
    id: "w14",
    title: "Sidewalk Stories",
    type: "art",
    medium: "Mixed Media",
    author: "Kina Xu",
    edition: "Issue XXXIX — Spring 2026",
    //imageUrl: "/art/sidewalkstories.jpg",
  },
  {
    id: "w15",
    title: "Duality of a Dancer",
    type: "art",
    medium: "Acyrlic",
    author: "Kina Xu",
    edition: "Issue XXXIX — Spring 2026",
    //imageUrl: "/art/dualityofadancer.jpg",
  },
  {
    id: "w16",
    title: "4.11.14",
    type: "art",
    medium: "Acrylic",
    author: "Juliet Phillips",
    edition: "Issue XXXIX — Spring 2026",
    //imageUrl: "/art/4-11-14.jpg",
  },
  {
    id: "w17",
    title: "Burned",
    type: "art",
    medium: "Altered Book/Mixed Media",
    author: "Moubon Ray Kurukumbi",
    edition: "Issue XXXIX — Spring 2026",
    imageUrl: "/art/burned.jpg",
    highlight: true,
  },
  {
    id: "w18",
    title: "17.24.26",
    type: "art",
    medium: "Acrylic",
    author: "Juliet Phillips",
    edition: "Issue XXXIX — Spring 2026",
    //imageUrl: "/art/17-24-26.jpg",
  },
  {
    id: "w19",
    title: "Mythos",
    type: "art",
    medium: "Digital Art",
    author: "Olivia Kim",
    edition: "Issue XXXIX — Spring 2026",
    //imageUrl: "/art/mythos.jpg",
  },
  {
    id: "w20",
    title: "Blow out a wish",
    type: "art",
    medium: "Acrylic",
    author: "Kyungsup Huang",
    edition: "Issue XXXIX — Spring 2026",
    //imageUrl: "/art/blowoutawish.jpg",
  },
  {
    id: "w21",
    title: "Half of a whole",
    type: "art",
    medium: "Acrylic",
    author: "Kyungsup Huang",
    edition: "Issue XXXIX — Spring 2026",
    //imageUrl: "/art/halfofawhole.jpg",
  },
  {
    id: "w22",
    title: "Reach for / the stars",
    type: "art",
    medium: "Drypoint Etching",
    author: "Kyungsup Huang",
    edition: "Issue XXXIX — Spring 2026",
    //imageUrl: "/art/reachforthestars.jpg",
  },
  {
    id: "w23",
    title: "reptile apocalypse (or in other words, please love me like this)",
    type: "poetry",
    author: "Kobimtochi Obi",
    edition: "Issue XXXIX — Spring 2026",
    excerpt: "water laps up the sides of the bathtub / each wet curve on porcelain is a lizard’s tail / i let it take me as i sink into the bath / i’m hoping to become something reptilian",
    fullText: 
      `water laps up the sides of the bathtub
      each wet curve on porcelain is a lizard’s tail
      
      i let it take me as i sink into the bath
      i’m hoping to become something reptilian
      
      when the sun dies
      spewing midnight blood all over the earth
      each popped vessel, a stream of stars
      i will be cold-blooded in the lack of light
      
      when i am lizard or turtle or crocodile
      you will find me in the dawn of angels
      knocking my slimy claws 
      on your window 
      and crawling into your bed
      
      don’t scream, don’t shout
      where is your love for the earth?
      very soon, you will become used to me
      because morning will always come
      even after the sun’s death
      
      you will grow acquainted 
      with my molts and scales,
      littered up and down the stairs
      
      you have no habitat for me
      so my tank will remain your bed.
      my cold skin nesting 
      next to your warmth every evening
      
      you can love me, just like this 
      i am ready for the unweaving 
      of everything to lie next to you
      can you hear the clouds 
      pulling apart like stubborn thread? 
      see the sky erasing its blue? 
      
      yet a rapt knock pervades everything
      “tat-tat-tat” reverberates all over me.
      i am only dying in the bath 
      and thinking of you
      
      i leave the water
      my fingertips scaly from its contact
      
      on the cotton sheets of my bed
      i am warm-blooded and fleshy
      
      there is no sun corpse on the horizon
      no star husks in the nearby lake 
      
      i turn on my side 
      and think 
      of whose cold tail 
      is wrapped around 
      your raw and mammal heart.
      
      tell me,
      does their skin glow in the moonlight?`,
  },
  /*{
    id: "w24",
    title: string,
    type: WorkType,
    medium?: string,
    author: string,
    edition: "Issue XXXIX — Spring 2026",
    excerpt?: string,
    fullText?: string,
    imageUrl?: string,
  },
  {
    id: "w25",
    title: string,
    type: WorkType,
    medium?: string,
    author: string,
    edition: "Issue XXXIX — Spring 2026",
    excerpt?: string,
    fullText?: string,
    imageUrl?: string,
  },*/
];

/* ---------- lookups used across the site ---------- */

export function getWork(id: string): Work | undefined {
  return WORKS.find((work) => work.id === id);
}

/** The Home page hero — the work flagged `featured` (or the first work). */
export function featuredWork(): Work {
  return WORKS.find((work) => work.featured) ?? WORKS[0];
}

/** Home "Recent Highlights" — works flagged `highlight` (max 3). */
export function highlightWorks(): Work[] {
  return WORKS.filter((work) => work.highlight).slice(0, 3);
}

/** Home "In This Issue" sidebar — latest-edition works, minus the hero. */
export function latestEditionWorks(limit = 4): Work[] {
  const hero = featuredWork();
  return WORKS.filter(
    (work) => work.edition === LATEST_EDITION && work.id !== hero.id,
  ).slice(0, limit);
}

/** First artwork of the latest edition — Home's featured-artwork slot. */
export function featuredArtwork(): Work | undefined {
  return WORKS.find(
    (work) => work.type === "art" && work.edition === LATEST_EDITION,
  );
}

/** Card label for a work's type: medium for art, genre for writing. */
export function typeLabel(work: Work): string {
  return work.type === "art" ? work.medium ?? "Art" : work.type;
}

/**
 * Resolve an imageUrl to a browser-loadable src. Repo-relative paths
 * ("/art/foo.jpg") get the deployment base path prefixed so they work
 * on GitHub Pages; full https:// links pass through untouched.
 */
export function resolveImageUrl(url: string): string {
  return url.startsWith("/")
    ? import.meta.env.BASE_URL.replace(/\/$/, "") + url
    : url;
}
