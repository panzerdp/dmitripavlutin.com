import * as React from 'react';

export default function PostSubscribeForm() {
  return (
    <form
      action="//rainsoft.us13.list-manage.com/subscribe/post?u=7cedcb1f5ab74eb7c907e768e&amp;id=75f44f92b9"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      className="validate"
      target="_blank"
      noValidate={true}
    >
      <div id="mc_embed_signup_scroll">
        <div className="subscribe-title">
          <h3>Subscribe to our newsletter!</h3>
          Always be learning: level up your skills with latest articles from my blog.
        </div>
        <input
          type="email"
          value=""
          name="EMAIL"
          className="email"
          id="mce-EMAIL"
          placeholder="email address"
          required={true}
        />
        {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
          <input type="text" name="b_7cedcb1f5ab74eb7c907e768e_75f44f92b9" tabIndex={-1} value="" />
        </div>
        <div className="clear">
          <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
        </div>
      </div>
    </form>
  );
}
