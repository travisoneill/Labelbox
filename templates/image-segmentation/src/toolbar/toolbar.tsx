import * as React from 'react';
import { Tool } from './tool';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import { ToolType } from '../labeling-screen/segment-image';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import styled from 'styled-components';
/* import ExpandMoreIcon from 'material-ui-icons/ExpandMore';*/
import { Classification,  } from './classification';
import { ClassificationField } from '../app.reducer';

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px;
  min-height: 36px;
`;

export function ToolMenu(
  {
    tools,
    classificationFields,
    toolChange,
    currentTool,
    visibilityToggle,
    disableSubmit,
    onSubmit,
    onSkip,
    onClassificationAnswer,
    editing,
    onReset,
  }: {
    tools: {id: string, name: string, color: string, count: number, visible: boolean, tool: ToolType}[];
    classificationFields: ClassificationField[],
    toolChange: (id: string | undefined) => void;
    currentTool: string | undefined;
    visibilityToggle: (toolIndex: string) => void;
    disableSubmit: boolean;
    onSubmit: () => void;
    onClassificationAnswer: (fieldId: string, answer: string | string[]) => void;
    onSkip: () => void;
    onReset: () => void;
    editing: boolean;
  }) {
  return (
    <div className="toolbar">
      <div style={{display: 'flex', flexGrow: '1', flexDirection: 'column', width: '100%'} as any}>
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
          <div style={{margin: '20px 15px 10px', fontWeight: '500', color: '#5b5b5b'} as any}>Select a class below</div>
          <div style={{overflowY: 'auto', overflowX: 'hidden'}}>
            {tools.map(({id, name, color, count, visible, tool}, index) => (
              <Tool
                name={name}
                key={index}
                tooltip={index < 9 ? ('or press ' + (index + 1)).toString() : undefined}
                toolName={tool}
                color={color}
                count={count}
                visible={visible}
                visibilityToggle={() => visibilityToggle(id)}
                onClick={() => toolChange(id !== currentTool ? id : undefined)}
                selected={id === currentTool}
              />
            ))}
            {classificationFields.map((field) => (
              <Classification
                key={field.id}
                field={field}
                answer={field.userAnswer}
                onAnswer={(answer: string | string[]) => onClassificationAnswer(field.id, answer)}
              />))}
          </div>
        </div>
        <div style={{display: 'flex', flexGrow: '1'} as any}></div>

        <ExpansionPanel style={{boxShadow: 'none', borderBottom: '1px solid #e0e0e0'}}>
          <ExpansionPanelSummary expandIcon={<Icon>keyboard_arrow_up</Icon>}>
            <Typography>Keyboard Shortcuts</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{display: 'flex', flexDirection: 'column', padding: '0px', overflowY: 'auto', maxHeight: '60vh'}}>
            {
              tools.slice(0, 9).map(({name}, index) => (
                <div key={index} style={{
                  display: 'flex',
                  flexGrow: 1,
                  borderBottom: '1px solid #c1c1c1',
                  fontSize: '12px',
                  padding: '10px 15px',
                  color: 'grey',
                  minHeight: '10px',
                }}>
                  <div style={{display: 'flex', flexGrow: '1'} as any}>
                    <div style={{flex: '60'}}>{name}</div>
                    <div style={{flex: '40'}}>{index + 1}</div>
                  </div>
                </div>
              ))
            }
            <div style={{display: 'flex', flexGrow: '1', borderBottom: '1px solid #c1c1c1', fontSize: '12px', padding: '10px 15px', color: 'grey', minHeight: '10px'} as any}>
              <div style={{display: 'flex', flexGrow: '1'} as any}>
                <div style={{flex: '60'}}>Complete Shape</div>
                <div style={{flex: '40'}}>f</div>
              </div>
            </div>
            <div style={{display: 'flex', flexGrow: '1', borderBottom: '1px solid #c1c1c1', fontSize: '12px', padding: '10px 15px', color: 'grey', minHeight: '10px'} as any}>
              <div style={{display: 'flex', flexGrow: '1'} as any}>
                <div style={{flex: '60'}}>Undo</div>
                <div style={{flex: '40'}}>cmd/ctrl z</div>
              </div>
            </div>
            <div style={{display: 'flex', flexGrow: '1', borderBottom: '1px solid #c1c1c1', fontSize: '12px', padding: '10px 15px', color: 'grey', minHeight: '10px'} as any}>
              <div style={{display: 'flex', flexGrow: '1'} as any}>
                <div style={{flex: '60'}}>Delete</div>
                <div style={{flex: '40'}}>backspace</div>
              </div>
            </div>
            <div style={{display: 'flex', flexGrow: '1', borderBottom: '1px solid #c1c1c1', fontSize: '12px', padding: '10px 15px', color: 'grey', minHeight: '10px'} as any}>
              <div style={{display: 'flex', flexGrow: '1'} as any}>
                <div style={{flex: '60'}}>Deselect Tool</div>
                <div style={{flex: '40'}}>escape</div>
              </div>
            </div>
            <div style={{display: 'flex', flexGrow: '1', borderBottom: '1px solid #c1c1c1', fontSize: '12px', padding: '10px 15px', color: 'grey', minHeight: '10px'} as any}>
              <div style={{display: 'flex', flexGrow: '1'} as any}>
                <div style={{flex: '60'}}>Submit</div>
                <div style={{flex: '40'}}>e</div>
              </div>
            </div>
            <div style={{display: 'flex', flexGrow: '1', borderBottom: '1px solid #c1c1c1', fontSize: '12px', padding: '10px 15px', color: 'grey', minHeight: '10px'} as any}>
              <div style={{display: 'flex', flexGrow: '1'} as any}>
                <div style={{flex: '60'}}>Skip</div>
                <div style={{flex: '40'}}>a</div>
              </div>
            </div>
            <div style={{display: 'flex', flexGrow: '1', borderBottom: '1px solid #c1c1c1', fontSize: '12px', padding: '10px 15px', color: 'grey', minHeight: '10px'} as any}>
              <div style={{display: 'flex', flexGrow: '1'} as any}>
                <div style={{flex: '60'}}>Bring to front</div>
                <div style={{flex: '40'}}>cmd/ctrl ↑</div>
              </div>
            </div>
            <div style={{display: 'flex', flexGrow: '1', borderBottom: '1px solid #c1c1c1', fontSize: '12px', padding: '10px 15px', color: 'grey', minHeight: '10px'} as any}>
              <div style={{display: 'flex', flexGrow: '1'} as any}>
                <div style={{flex: '60'}}>Send to back</div>
                <div style={{flex: '40'}}>cmd/ctrl ↓</div>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        {
          editing ?
            (
              <ActionButtons>
                <Button disabled={disableSubmit} onClick={() => onReset()}>Reset</Button>
                <Tooltip title="or press e" placement="right">
                  <Button disabled={disableSubmit} color="primary" raised={true} onClick={() => onSubmit()}>Save</Button>
                </Tooltip>
              </ActionButtons>
            ) :
            (
              <ActionButtons>
                <Tooltip title="or press a" placement="left">
                  <Button onClick={() => onSkip()}>Skip</Button>
                </Tooltip>
                <Tooltip title="or press e" placement="right">
                  <div><Button color="primary" raised={true} disabled={disableSubmit} onClick={() => onSubmit()}>Submit</Button></div>
                </Tooltip>
              </ActionButtons>
            )
        }
      </div>

    </div>
  );
}
