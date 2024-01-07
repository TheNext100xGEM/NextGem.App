import { Wrapper } from '@components/Page'
import { SITE_NAME } from '@constants/index'
import { Helmet } from 'react-helmet-async'

function DefaultPage() {
  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Default page</title>
      </Helmet>
      <Wrapper>
        <h1>Privacy Policy</h1>
        <div className="intro">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure, consectetur maiores, quasi asperiores, nihil nam est ab unde sapiente vel deserunt nobis quo sint qui beatae esse explicabo optio aliquid. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta maiores assumenda molestiae. Harum illo soluta, modi quidem ducimus autem eligendi enim ad est vitae, odit iste laboriosam rerum accusantium perferendis?</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo sit odio neque provident recusandae mollitia minima molestiae, amet qui ex facere expedita harum labore vero. Fugiat non est hic laboriosam.</p>
        </div>
        <hr />
        <h2>Lorem ipsum dolor</h2>
        <div className="intro">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, saepe ut amet, architecto aliquam eligendi itaque laudantium quos cum quae sint corporis velit voluptate inventore obcaecati, consectetur doloremque voluptatem impedit.</p>
        </div>
        <div className="p">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi cum eos nostrum sequi, ullam, ratione distinctio a porro unde ipsam voluptatibus temporibus labore, magni quisquam enim esse architecto praesentium amet.</p>
          <ol>
            <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, quasi harum enim deleniti quas nobis doloremque sed magnam vero ducimus accusantium eos accusamus illum iste quibusdam sequi dignissimos at! Error!</li>
            <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, quasi harum enim deleniti quas nobis doloremque sed magnam vero ducimus accusantium eos accusamus illum iste quibusdam sequi dignissimos at! Error!</li>
            <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, quasi harum enim deleniti quas nobis doloremque sed magnam vero ducimus accusantium eos accusamus illum iste quibusdam sequi dignissimos at! Error!</li>
            <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, quasi harum enim deleniti quas nobis doloremque sed magnam vero ducimus accusantium eos accusamus illum iste quibusdam sequi dignissimos at! Error!</li>
          </ol>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta voluptatibus reprehenderit, voluptates, laudantium dignissimos architecto dolores autem fuga officiis similique repudiandae. Quam quidem molestiae neque, odio ad atque mollitia eius. Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, explicabo ratione ipsam repellendus atque ab natus ullam doloremque ea libero illo non! Quo distinctio asperiores, dolor accusamus vero culpa sequi.</p>
        </div>
        <hr />
        <h2>Lorem ipsum dolor</h2>
        <h3>Lorem ipsum dolor</h3>
        <div className="p">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi cum eos nostrum sequi, ullam, ratione distinctio a porro unde ipsam voluptatibus temporibus labore, magni quisquam enim esse architecto praesentium amet.</p>
          <ul>
            <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, quasi harum enim deleniti quas nobis doloremque sed magnam vero ducimus accusantium eos accusamus illum iste quibusdam sequi dignissimos at! Error!</li>
            <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, quasi harum enim deleniti quas nobis doloremque sed magnam vero ducimus accusantium eos accusamus illum iste quibusdam sequi dignissimos at! Error!</li>
            <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, quasi harum enim deleniti quas nobis doloremque sed magnam vero ducimus accusantium eos accusamus illum iste quibusdam sequi dignissimos at! Error!</li>
            <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, quasi harum enim deleniti quas nobis doloremque sed magnam vero ducimus accusantium eos accusamus illum iste quibusdam sequi dignissimos at! Error!</li>
          </ul>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta voluptatibus reprehenderit, voluptates, laudantium dignissimos architecto dolores autem fuga officiis similique repudiandae. Quam quidem molestiae neque, odio ad atque mollitia eius. Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, explicabo ratione ipsam repellendus atque ab natus ullam doloremque ea libero illo non! Quo distinctio asperiores, dolor accusamus vero culpa sequi.</p>
        </div>
        <div className="p">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi cum eos nostrum sequi, ullam, ratione distinctio a porro unde ipsam voluptatibus temporibus labore, magni quisquam enim esse architecto praesentium amet.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta voluptatibus reprehenderit, voluptates, laudantium dignissimos architecto dolores autem fuga officiis similique repudiandae. Quam quidem molestiae neque, odio ad atque mollitia eius. Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, explicabo ratione ipsam repellendus atque ab natus ullam doloremque ea libero illo non! Quo distinctio asperiores, dolor accusamus vero culpa sequi.</p>
        </div>
        <h3>Lorem ipsum dolor</h3>
        <div className="p">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi cum eos nostrum sequi, ullam, ratione distinctio a porro unde ipsam voluptatibus temporibus labore, magni quisquam enim esse architecto praesentium amet.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta voluptatibus reprehenderit, voluptates, laudantium dignissimos architecto dolores autem fuga officiis similique repudiandae. Quam quidem molestiae neque, odio ad atque mollitia eius. Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, explicabo ratione ipsam repellendus atque ab natus ullam doloremque ea libero illo non! Quo distinctio asperiores, dolor accusamus vero culpa sequi.</p>
        </div>
        <h5>Privacy Policy</h5>
        <div className="p">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi cum eos nostrum sequi, ullam, ratione distinctio a porro unde ipsam voluptatibus temporibus labore, magni quisquam enim esse architecto praesentium amet.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta voluptatibus reprehenderit, voluptates, laudantium dignissimos architecto dolores autem fuga officiis similique repudiandae. Quam quidem molestiae neque, odio ad atque mollitia eius. Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, explicabo ratione ipsam repellendus atque ab natus ullam doloremque ea libero illo non! Quo distinctio asperiores, dolor accusamus vero culpa sequi.</p>
        </div>
        <h6>Privacy Policy</h6>
        <div className="p">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi cum eos nostrum sequi, ullam, ratione distinctio a porro unde ipsam voluptatibus temporibus labore, magni quisquam enim esse architecto praesentium amet.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta voluptatibus reprehenderit, voluptates, laudantium dignissimos architecto dolores autem fuga officiis similique repudiandae. Quam quidem molestiae neque, odio ad atque mollitia eius. Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, explicabo ratione ipsam repellendus atque ab natus ullam doloremque ea libero illo non! Quo distinctio asperiores, dolor accusamus vero culpa sequi.</p>
        </div>
      </Wrapper>
    </>
  )
}

export default DefaultPage