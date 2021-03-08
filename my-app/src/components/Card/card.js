import React from 'react';
import { Link } from "react-router-dom"
import {useTransition, animated} from 'react-spring'

export const Card = ({ listofTodos }) => {
   
   return(
      <>
      {
         listofTodos.map(todo => {
            return(
               <ul key = {todo.id}>
                  <li>
                     <Link to={`${todo.id}`}>{todo.content}</Link>
                  </li>
               </ul>
            )
         })}
      </>
   )

   // const transition = useTransition(listofTodos, listofTodos => listofTodos.id, {
   //    from: {
   //       opacity: 1,
   //       width: '4%',
   //       marginLeft: -100,
   //       marginRight: 100
   //    },
   //    enter: {
   //       opacity: 1,
   //       width: '100%',
   //       padding: '5px 0',
   //       marginLeft: 0,
   //       marginRight: 0
   //    }
   // })

   // return transition.map(({ item, key, props }) => (
   //    <animated.ul key={item.id} style={props}>
   //       <li>
   //          <Link to={`${item.id}`}>{item.content}</Link>
   //       </li>
   //    </animated.ul>
   // ))

   // return(
   //    <>
   //    {listofTodos.map(todo => {
   //       return(
   //          <ul key = {todo.id}>
   //             <li>
   //                <Link to={`${todo.id}`}>{todo.content}</Link>
   //             </li>
   //          </ul>
   //       )
   //    })}
   //    </>
   // )
   // return <div>Hello World</div>
}