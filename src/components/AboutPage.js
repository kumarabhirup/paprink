import React, { Component } from 'react'
import styled from 'styled-components'
import Router, { withRouter } from 'next/router'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'

import PageContent from './PageContent'

class AboutPage extends Component {

  render() {
    return (
      <PageContent noSidebar>

        {/* Post Content */}
            
          <div classNameName="col-lg-10 offset-lg-1" style={{paddingBottom: "50px"}}>
            <div classNameName="post_content">
              <div classNameName="post_body">

                <p className="post_p">
                  PaprInk is made to inspire people to write everyday. In 21st century, everyone needs to develop a habit of writing all what they think in their minds. To bring the habit in, PaprInk reminds people to pledge to write something everyday. With everlasting number of allowed categories to write about, you are at the right place to get the motivation for writing.
                </p>

                <figure>
                  <img src="https://i.ibb.co/pQRG5ZT/PaprInk.jpg" alt="PaprInk logo" />
                  <figcaption>PaprInk, where writers flourish.</figcaption>
                </figure>

                <h1>Why should one write?</h1>
                <br />
                <br />
                <b>Writing and happiness: </b>
                <p className="post_p">
                  Much of the research on writing and happiness deals with “expressive writing,” or jotting down what you think and how you feel. Even blogging “undoubtedly affords similar benefits” to private expressive writing in terms of therapeutic value.               
                </p>
                <p className="post_p">
                  Expressive writing has also been linked to improved mood, well-being, and reduced stress levels for those who do it regularly, says Adam Grant:
                </p>

                <div className="post_quote">
                  <p className="post_p">Research by Laura King shows that writing about achieving future goals and dreams can make people happier and healthier... And Jane Dutton and I found that when people doing stressful fundraising jobs kept a journal for a few days about how their work made a difference, they increased their hourly effort by 29% over the next two weeks.</p>
                  <div className="post_quote_source">Adam Grant</div>
                </div>

                <br />
                <br />
                <b>Writing and communicating clearly:</b>
                <p className="post_p">Laziness with words creates difficulty in describing feelings, sharing experiences, and communicating with others. Being able to flesh out thoughts in your mind only to have them come stumbling out when you speak is supremely frustrating. Fortunately, regular writing seems to offer some reprieve.</p>
                <p className="post_p">In both emotional intelligence and in hard sciences like mathematics, writing has been shown to help people communicate highly complex ideas more effectively.</p>
                <p className="post_p">Writing helps eliminate “it sounded good in my head” by forcing your hand; brains forgive fuzzy abstractions, prose does not.</p>
                
                <br />
                <br />
                <b>Writing and handling hard times:</b>
                <p className="post_p">In one study that followed recently fired engineers, the researchers found that those engineers who consistently engaged with expressive writing were able to find another job faster. Says Adam Grant:</p>
                <div className="post_quote">
                  <p className="post_p">The engineers who wrote down their thoughts and feelings about losing their jobs reported feeling less anger and hostility toward their former employer. They also reported drinking less. Eight months later, less than 19% of the engineers in the control groups were reemployed full-time, compared with more than 52% of the engineers in the expressive writing group.</p>
                  <div className="post_quote_source">Adam Grant</div>
                </div>

                <br />
                <br />
                <b>Writing and gratitude:</b>
                <p className="post_p">As the authors of one study noted, subjects who reflected on the good things in their life once a week by writing them down were more positive and motivated about their current situations and their futures.</p>
                <p className="post_p">The catch was, when they wrote about them every day, the benefits were minimal. This makes sense; any activity can feel disingenuous and just plain boring if done too often. It seems like the key is to reflect and write about gratitude regularly, but not begrudgingly often.</p>

                <br />
                <br />
                <p className="post_p"><b>Source: <a href="https://www.helpscout.com/blog/benefits-of-writing" target="_blank">HelpScout</a></b></p>

                <br />
                <br />
                <h1>So, how does PaprInk work?</h1>
                <br />
                <p className="post_p">Every post you right will be featured in the “Latest section” as soon as you publish. If people love your content enough, they’ll upvote the post and bring it at the top of “Today Trending” list.</p>
                <p className="post_p">The new day at PaprInk starts at 12:00 am Pacific Time. Make sure you draft your post before and publish it early on the new day, if you want your post to be seen at the top for getting readers and upvotes.</p>
                <p className="post_p">Keep writing everyday and we’ll email you your progress at writing. PaprInk helps you do away with the hassles of SEO that you need to deal with when you setup a blog, or the struggle to get the follower count high on Medium for getting your posts some eyeballs.</p>
                
                <p className="post_p"><b>At PaprInk, everyone’s got a fair chance. Keep writing ✍️ Keep sliding that ink on your paper!</b></p>

              </div>
            </div>
          </div>

        {/* End of Post Content */}
        
      </PageContent>
    )
  }

}

export default withRouter(AboutPage)