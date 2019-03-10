import React, { Component } from 'react'

import PageContent from '../PageContent'
import { today } from '../../api/posts'
import Card from '../Card/'

export default class EditorPage extends Component {
  render() {
    return (
      <PageContent noSidebar>

        {/* Post Content */}

				<div className="col-lg-10 offset-lg-1">
					<div className="post_content">

            <input type="text" placeholder="Write that awesome title!" />

						<div className="post_body" style={{marginTop: "20px"}}>
							<p className="post_p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce enim nulla, mollis eu metus in, sagittis fringilla tortor. Phasellus eget purus id felis dignissim convallis. Suspendisse et augue dui. Morbi gravida sed justo vel venenatis. Ut tempor pretium maximus. Donec libero diam, faucibus vitae lectus nec, accumsan gravida dui. Nam interdum mi eget lacus aliquet, sit amet ultricies magna pharetra. In ut odio a ligula egestas pretium et quis sapien. Etiam faucibus magna eu porta vulputate. Aliquam euismod rhoncus malesuada. Nunc rutrum hendrerit semper.</p>
							<figure>
								<img src="/static/prebuilt/images/post_image.jpg" alt="" />
								<figcaption>Lorem Ipsum Dolor Sit Amet</figcaption>
							</figure>
							<p className="post_p">Maecenas vitae sem varius, imperdiet nisi a, tristique nisi. Sed scelerisque suscipit leo cursus accumsan. Donec vel turpis quam. Mauris non nisl nec nunc gravida ullamcorper id vestibulum magna. Donec non velit finibus, laoreet arcu nec, facilisis augue. Aliquam sed purus id erat accumsan congue. Mauris semper ullamcorper nibh non pellentesque. Aenean euismod purus sit amet quam vehicula ornare.</p>
							<div className="post_quote">
								<p className="post_p">Aliquam auctor lacus a dapibus pulvinar. Morbi in elit erat. Quisque et augue nec tortor blandit hendrerit eget sit amet sapien. Curabitur at tincidunt metus, quis porta ex. Duis lacinia metus vel eros cursus pretium eget.</p>
								<div className="post_quote_source">Robert Morgan</div>
							</div>
							<p className="post_p">Donec orci dolor, pretium in luctus id, consequat vitae nibh. Quisque hendrerit, lorem sit amet mollis malesuada, urna orci volutpat ex, sed scelerisque nunc velit et massa. Sed maximus id erat vel feugiat. Phasellus bibendum nisi non urna bibendum elementum. Aenean tincidunt nibh vitae ex facilisis ultrices. Integer ornare efficitur ultrices. Integer neque lectus, venenatis at pulvinar quis, aliquet id neque. Mauris ultrices consequat velit, sed dignissim elit posuere in. Cras vitae dictum dui.</p>

							<div className="post_tags" style={{marginTop: '30px'}}>
								<ul>
									<li className="post_tag"><a href="#">Liberty</a></li>
									<li className="post_tag"><a href="#">Manual</a></li>
									<li className="post_tag"><a href="#">Interpretation</a></li>
									<li className="post_tag"><a href="#">Recommendation</a></li>
								</ul>
							</div>
						</div>
						
						<div className="post_panel bottom_panel d-flex flex-row align-items-center justify-content-start">
							HEY
						</div>

          </div>
        </div>


        {/* End of Post Content */}
        
      </PageContent>
    )
  }
}
