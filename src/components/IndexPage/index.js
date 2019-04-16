import React, { Component } from 'react'
import PageContent from '../PageContent'
import Sidebar from '../Sidebar/'
import Today from './Today'
import Trending from './Trending'
import Latest from './Latest'
import Yesterday from './Yesterday';
import User from '../User';

export default class IndexPage extends Component {
  render() {
    return (
      <PageContent>
        <User>
          { payload => (
            <>
            { /* PAGE CONTENT */ }
            <div className="col-lg-9">
              <div className="main_content" style={{paddingBottom: "40px"}}>
                
                  <Today user={payload.data && payload.data.me} />
                  <Yesterday user={payload.data && payload.data.me} />
                  <Trending user={payload.data && payload.data.me} />
                  {/* <Latest /> */}
              
                {/* <h2 style={{marginTop: "40px"}}>Page Under Construction...</h2> */}
              </div>
            </div>
            { /* END OF PAGE CONTENT */ }
            <Sidebar />
            </>
          ) }
        </User>
      </PageContent>
    )
  }
}
